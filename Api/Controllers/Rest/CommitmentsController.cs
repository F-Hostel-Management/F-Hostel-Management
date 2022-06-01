using Api.UserFeatures.Requests;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Room;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest;

[Route("api/Rooms/{roomId}/")]
public class CommitmentsController : BaseRestController
{
    private readonly IGenericRepository<HostelEntity> _hostelRepository;
    private readonly ICommitmentServices _commitmentServices;
    private readonly IRoomServices _roomServices;
    private readonly ITenantServices _tenantServices;


    public CommitmentsController(
        IGenericRepository<HostelEntity> hostelRepository,
        ICommitmentServices commitmentServices,
        IRoomServices roomServices,
        ITenantServices tenantServices)
    {
        _tenantServices = tenantServices;
        _hostelRepository = hostelRepository;
        _commitmentServices = commitmentServices;
        _roomServices = roomServices;
    }

    [HttpPost("commitments")]
    public async Task<IActionResult> CreateCommitment([FromRoute] Guid roomId, CreateCommitmentRequest comReq)
    {

        // check room status
        RoomEntity room = await _roomServices.GetAvailableRoomByIdAsync(roomId);
        if (room == null)
        {
            return BadRequest("Room does not exist or already rented");
        }

        // not check hostel owner and owner from request
        HostelEntity hostel = await _hostelRepository.FirstOrDefaultAsync(hostel => hostel.Id.Equals(room.HostelId));

        if (!comReq.OwnerId.Equals(hostel.OwnerId))
        {
            return Unauthorized();
        }

        bool isDuplicated = await _commitmentServices.IsExist(comReq.CommitmentCode);
        if (isDuplicated)
        {
            return BadRequest("Commitment code duplicate");
        }

        // call service
        CommitmentEntity com = Mapper.Map<CommitmentEntity>(comReq);
        await _commitmentServices.CreateCommitment(com, room);

        // update room status
        await _roomServices.Rent(room);

        return Ok(com);
    }

    // owner conform commitment ==> com.status => approved
    [HttpPatch("commitment/owner/status")]
    public async Task<IActionResult> OwnerApprovedCommitment
        ([FromRoute] Guid roomId)
    {
        CommitmentEntity com =
            await _commitmentServices.GetPendingCommitmentByRoom(roomId);
        if (com == null)
        {
            return BadRequest();
        }

        await _commitmentServices.ApprovedCommitment(com);
        return Ok(com);
    }



    // tenant into commitment ==> com.status => done
    //[Authorize(nameof(Role.Tenant))]
    [HttpPatch("commitment/tenant/{tenantId}/status")]
    public async Task<IActionResult> TenantDoneCommitment
    ([FromRoute] Guid roomId, Guid tenantId)
    {
        CommitmentEntity com =
            await _commitmentServices.GetApprovedCommitmentByRoom(roomId);
        if (com == null)
        {
            return BadRequest();
        }

        await _commitmentServices.DoneCommitment(com, tenantId);
        await _tenantServices.GetIntoRoom(com.RoomId, tenantId);
        return Ok(com);
    }

    // commitment expired ==> com.status => expired => remove all invoice schedules
}
