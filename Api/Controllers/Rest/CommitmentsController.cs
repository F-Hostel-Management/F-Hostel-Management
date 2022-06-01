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

public class CommitmentsController : BaseRestController
{
    private readonly IGenericRepository<HostelEntity> _hostelRepository;
    private readonly ICommitmentServices _commitmentServices;
    private readonly IRoomServices _roomServices;
    private readonly ITenantServices _tenantServices;
    private readonly IJoiningCodeServices _joiningCodeServices;


    public CommitmentsController(
        IGenericRepository<HostelEntity> hostelRepository,
        ICommitmentServices commitmentServices,
        IJoiningCodeServices joiningCodeServices,
        IRoomServices roomServices,
        ITenantServices tenantServices)
    {
        _tenantServices = tenantServices;
        _hostelRepository = hostelRepository;
        _joiningCodeServices = joiningCodeServices;
        _commitmentServices = commitmentServices;
        _roomServices = roomServices;
    }

    [HttpPost]
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
    [HttpPatch("owner/status")]
    public async Task<IActionResult> OwnerApprovedCommitment
        ([FromBody] OwnerApprovedCommitmentRequest req)
    {
        CommitmentEntity com =
            await _commitmentServices.GetPendingCommitmentByRoom(req.RoomId);
        if (com == null)
        {
            return BadRequest();
        }

        await _commitmentServices.ApprovedCommitment(com);
        return Ok(com);
    }



    // tenant into commitment ==> com.status => done
    [Authorize(nameof(Role.Tenant))]
    [HttpPatch("tenant/status")]
    public async Task<IActionResult> TenantDoneCommitment
    ([FromBody] TenantDoneCommitmentRequest req)
    {
        CommitmentEntity com =
            await _commitmentServices.GetApprovedCommitmentByRoom(req.RoomId);
        if (com == null)
        {
            return BadRequest();
        }

        await _commitmentServices.ActivatedCommitment(com, req.TenantId);
        await _tenantServices.GetIntoRoom(com.RoomId, req.TenantId);
        return Ok(com);
    }

    // commitment expired ==> com.status => expired => remove all invoice schedules

    // create joining code
    [HttpPost("joiningCode")]
    public async Task<IActionResult> CreateJoiningCode
        ([FromBody] CreateJoiningCodeRequest req)
    {
        CommitmentEntity currentCom = await _commitmentServices.GetNotExpiredCommitmentById(req.CommitementId);
        if (currentCom == null)
        {
            return BadRequest("Commitment does not exist");
        }

        JoiningCode joiningCode = Mapper.Map<JoiningCode>(req);
        var response = await _joiningCodeServices.CreateJoiningCode(joiningCode);
        return Ok(joiningCode);
    }
}
