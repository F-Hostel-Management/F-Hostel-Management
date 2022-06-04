using Api.UserFeatures.Requests;
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
    public RoomsController(
        IGenericRepository<RoomEntity> roomsRepository)
    {
        _roomsRepository = roomsRepository;
    }

    [HttpGet("{roomId}")]
    public async Task<IActionResult> GetRoomsAsync(Guid roomId)
    {
        return Ok(await _roomsRepository.FindByIdAsync(roomId));
    }

    [HttpPost()]
    public async Task<IActionResult> CreateRoomsAsync(CreateRoomsRequest req)
    {
        if (req.Quantity == null)
        {
            req.Quantity = 1;
        }

        if (req.RoomName == null)
        {
            req.RoomName = "Unnamed";
        }

        List<RoomEntity> rooms = new List<RoomEntity>();
        while (req.Quantity > 0)
        {
            rooms.Add(Mapper.Map<RoomEntity>(req));
            req.Quantity--;
        }

        await _roomsRepository.CreateRangeAsync(rooms);
        return Ok();
    }

}
