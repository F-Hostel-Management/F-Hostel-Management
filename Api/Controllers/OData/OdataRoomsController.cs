using Infrastructure.Contexts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers.OData;


public class OdataRoomsController : BaseODataController
{
    private readonly ApplicationDbContext _context;
    public OdataRoomsController(
        ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("rooms")]
    public IActionResult GetRooms()
    {
        return Ok(_context.Rooms);
    }

    [HttpGet("hostels/rooms/{RoomId}")]
    public IActionResult GetHotelByRoomId(Guid RoomId)
    {
        var room = _context.Rooms
            .Where(room => room.Id.Equals(RoomId))
            .Include(hostel => hostel.Hostel);
        if (room == null)
        {
            return NotFound();
        }
        return Ok(room);
    }

}
