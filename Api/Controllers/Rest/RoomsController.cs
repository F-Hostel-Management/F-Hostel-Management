using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Entities.Commitment;
using Domain.Entities.Room;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest;

public class RoomsController : BaseRestController
{
    private readonly IGenericRepository<RoomEntity> _roomsRepository;
    private readonly ICommitmentServices _commitmentServices;
    public RoomsController(
        IGenericRepository<RoomEntity> roomsRepository,
        ICommitmentServices commitmentServices)
    {
        _roomsRepository = roomsRepository;
        _commitmentServices = commitmentServices;
    }

    [HttpGet()]
    public async Task<IActionResult> GetRoomsAsync()
    {
        return Ok(await _roomsRepository.ListAsync());
    }
}
