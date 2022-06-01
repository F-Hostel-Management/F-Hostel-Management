using Domain.Entities;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Extensions;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers.OData;


public class HostelsController : BaseODataController<HostelEntity>
{


    //// return room expand 
    //[EnableQuery]
    //[HttpGet("rooms/{roomId}")]
    //public IActionResult GetHotelByRoomId(Guid roomId)
    //{
    //    var room = DbContext.Rooms
    //        .Where(room => room.Id.Equals(roomId))
    //        .Include(hostel => hostel.Hostel);
    //    if (room == null)
    //    {
    //        return NotFound();
    //    }
    //    return Ok(room);
    //}

    //[EnableQuery]
    //[HttpGet("{hostelId}/get-all-commitments")]
    //public IActionResult GetCommitmentsByHostel([FromRoute] Guid hostelId)
    //{

    //    var coms = DbContext.Commitments.Where(com =>
    //                com.Room.HostelId.Equals(hostelId)
    //                );
    //    return Ok(coms);
    //}
    public HostelsController(ApplicationDbContext db) : base(db)
    {
    }

    protected override IQueryable<HostelEntity> GetQuery()
    {
        var query = from hostel in db.Hostels
                    select hostel;
        return base.GetQuery();
    }
}
