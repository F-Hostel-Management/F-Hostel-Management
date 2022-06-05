using Domain.Constants;
using Domain.Entities.Room;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace Api.Controllers.OData;

[Authorize]
public class RoomsController : BaseODataController<RoomEntity>
{
    public RoomsController(ApplicationDbContext db) : base(db)
    {
    }

    [ApiExplorerSettings(IgnoreApi = true)]
    [HttpGet("{roomId}")]
    public IQueryable GetRoomDetails
    (ODataQueryOptions<RoomEntity> options, [FromRoute] Guid roomId)
    {
        var query = db.Rooms.Where(r => r.Id.Equals(roomId));
        return ApplyQuery(options, query);
    }

}
