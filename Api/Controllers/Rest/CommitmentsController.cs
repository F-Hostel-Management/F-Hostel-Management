using Api.UserFeatures.Requests;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Room;
using Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest;

[Route("api/rooms/{RoomId}/")]
public class CommitmentsController : BaseRestController
{
    private readonly IGenericRepository<UserEntity> _userRepository;
    private readonly IGenericRepository<RoomEntity> _roomRepository;
    private readonly IGenericRepository<HostelEntity> _hostelRepository;
    private readonly ICommitmentServices _commitmentServices;
    private readonly IRoomServices _roomServices;

    public CommitmentsController(
        IGenericRepository<UserEntity> userRepository,
        IGenericRepository<RoomEntity> roomRepository,
        IGenericRepository<HostelEntity> hostelRepository,
        ICommitmentServices commitmentServices,
        IRoomServices roomServices)
    {
        _userRepository = userRepository;
        _roomRepository = roomRepository;
        _hostelRepository = hostelRepository;
        _commitmentServices = commitmentServices;
        _roomServices = roomServices;
    }

    [HttpPost("commitments")]
    public async Task<IActionResult> CreateCommitment([FromRoute] Guid RoomId, CreateCommitmentRequest comReq)
    {
        
        // check room status
        RoomEntity room = await _roomServices.GetAvailableRoomByIdAsync(RoomId);
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

/*    public async Task<IActionResult> OwnerApprovedCommitment([FromRoute] Guid RoomId)
    {

    }*/

    // owner conform commitment ==> com.status => approved

    // tenant into commitment ==> com.status => done

    // commitment expired ==> com.status => expired
}
