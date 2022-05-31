using Api.UserFeatures.Requests;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Room;
using Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest;

[Route("api/rooms/{RoomId}/commitments")]
public class CommitmentsController : BaseRestController
{
    private readonly IGenericRepository<UserEntity> _userRepository;
    private readonly IGenericRepository<RoomEntity> _roomRepository;
    private readonly ICommitmentServices _commitmentServices;
    private readonly IRoomServices _roomServices;

    public CommitmentsController(
        IGenericRepository<UserEntity> userRepository,
        IGenericRepository<RoomEntity> roomRepository,
        ICommitmentServices commitmentServices,
        IRoomServices roomServices)
    {
        _userRepository = userRepository;
        _roomRepository = roomRepository;
        _commitmentServices = commitmentServices;
        _roomServices = roomServices;
    }



    [HttpPost()]
    public async Task<IActionResult> CreateCommitment([FromRoute] Guid RoomId, CreateCommitmentRequest _com)
    {
        // check room status
        RoomEntity _room = await _roomServices.GetAvailableRoomByIdAsync(RoomId);
        if (_room == null)
        {
            return BadRequest("Room does not exist or already rented");
        }

        bool isDuplicated = await _commitmentServices.IsDuplicated(_com.CommitmentCode);
        if (isDuplicated)
        {
            return BadRequest("Commitment code duplicate");
        }

        // call service
        CommitmentEntity com = Mapper.Map<CommitmentEntity>(_com);
        await _commitmentServices.CreateCommitment(com, _room);

        // update room status
        await _roomServices.Rent(_room);

        return Ok(com);
    }

    // owner conform commitment ==> com.status => approved

    // tenant into commitment ==> com.status => done

    // commitment expired ==> com.status => expired
}
