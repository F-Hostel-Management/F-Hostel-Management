using Api.Filters;
using Application.Exceptions;
using Application.Interfaces;
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
    private readonly IAuthorizationServices _authorizationServices;
 

    public RoomsController(ApplicationDbContext db, IAuthorizationServices authorizationServices) : base(db)
    {
        _authorizationServices = authorizationServices;
    }

  
    // [HttpGet()]
    // public IQueryable GetRoomsForTenant(ODataQueryOptions<RoomEntity> options)
    // {
    //     var query = 
    //     return ApplyQuery(options, query);
    // }
    [Authorize(Roles = nameof(Role.Tenant))]
    public override IQueryable GetData(ODataQueryOptions<RoomEntity> options)
    {
        return base.GetData(options);
    }

    [ApiExplorerSettings(IgnoreApi = true)]
    protected override IQueryable<RoomEntity> GetQuery()
    {
        return db.Rooms.Where(room =>
            room.RoomTenants.Any(t =>
                t.TenantId.Equals(CurrentUserId)));
    }

    [ApiExplorerSettings(IgnoreApi = true)]
    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpGet("{roomId}/get-all-commitments")]
    public async Task<IQueryable> GetCommitmentsForRoom
        (ODataQueryOptions<CommitmentEntity> options, [FromRoute] Guid roomId)
    {
        if (!await _authorizationServices.IsRoomManageByCurrentUser(roomId, CurrentUserId))
            throw new ForbiddenException("");
        var query = db.Commitments.Where(commitment =>
                                         commitment.RoomId.Equals(roomId));
        return ApplyQuery(options, query);
    }
    
    [ApiExplorerSettings(IgnoreApi = true)]
    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpGet("{roomId}/detail")]
    public async Task<IQueryable> GetRoomDetailById
        (ODataQueryOptions<RoomEntity> options, [FromRoute] Guid roomId)
    {
        if (!await _authorizationServices.IsRoomManageByCurrentUser(roomId, CurrentUserId))
            throw new ForbiddenException("");
        var query = db.Rooms.Where(e => e.Id.Equals(roomId));
        return ApplyQuery(options, query);
    }
}
