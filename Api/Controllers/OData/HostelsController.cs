using Domain.Constants;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    protected override IQueryable<HostelEntity> GetQuery()
    {
        IQueryable<HostelEntity> result = base.GetQuery();
        if (CurrentUser.Role.Equals(Role.Owner))
        {
            result = db.Hostels
                        .Where(e => e.OwnerId.Equals(CurrentUser.Id));
        }
        if (CurrentUser.Role == Role.Manager)
        {
            result = db.Hostels
                        .Include(e=> e.HostelManagements)
                        .ThenInclude(e => e.ManagerId.Equals(CurrentUser.Id));
        }
        return result;
    }
}
