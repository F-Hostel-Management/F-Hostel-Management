using Api.Filters;
using Domain.Constants;
using Domain.Entities.Commitment;
using Domain.Entities.Room;
using Domain.Enums;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace Api.Controllers.OData;

//[Authorize]
public class RoomsController : BaseODataController<RoomEntity>
{
    public RoomsController(ApplicationDbContext db) : base(db)
    {
    }

    [ApiExplorerSettings(IgnoreApi = true)]
    [Authorize(Roles = nameof(Role.Tenant))]
    [HttpGet()]
    public IQueryable GetRoomsForTenant(ODataQueryOptions<RoomEntity> options)
    {
        var query = db.Rooms.Where(room =>
                                   room.RoomTenants.Any(t =>
                                                        t.TenantId.Equals(CurrentUserId)));
        return ApplyQuery(options, query);
    }

    [ServiceFilter(typeof(ValidateManagementFilter))]
    [ApiExplorerSettings(IgnoreApi = true)]
    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpGet("{roomId}/get-all-commitments")]
    public IQueryable GetCommitmentsForRoom
        (ODataQueryOptions<CommitmentEntity> options, [FromRoute] Guid roomId)
    {
        var query = db.Commitments.Where(commitment =>
                                         commitment.RoomId.Equals(roomId));
        return ApplyQuery(options, query);

    }
}
