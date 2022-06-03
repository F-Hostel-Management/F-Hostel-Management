using Domain.Constants;
using Domain.Entities;
using Domain.Entities.Room;
using Domain.Enums;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Extensions;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers.OData;

//[Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
public class HostelsController : BaseODataController<HostelEntity>
{

    public HostelsController(ApplicationDbContext db) : base(db)
    {
    }

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
                        .Include(e => e.HostelManagements)
                        .ThenInclude(e => e.ManagerId.Equals(CurrentUser.Id));
        }
        return result;
    }

    [ApiExplorerSettings(IgnoreApi = true)]
    [HttpGet("{hostelId}")]
    public IQueryable GetHostelById(ODataQueryOptions<HostelEntity> options, Guid hostelId)
    {
        var query = db.Hostels.Where(hostel => hostel.Id.Equals(hostelId));
        return ApplyQuery(options, query);
    }

    [ApiExplorerSettings(IgnoreApi = true)]
    [HttpGet("owners/{ownerId}")]
    public IQueryable GetAllHostelOfOwner(ODataQueryOptions<HostelEntity> options, Guid ownerId)
    {
        var query = db.Hostels.Where(hostel => hostel.OwnerId.Equals(ownerId));
        return ApplyQuery(options, query);
    }

    [ApiExplorerSettings(IgnoreApi = true)]
    [HttpGet("{hostelId}/rooms")]
    public IQueryable GetAllRoomsOfHostel(ODataQueryOptions<RoomEntity> options, Guid hostelId)
    {
        var query = db.Rooms.Where(room => room.HostelId.Equals(hostelId));
        return ApplyQuery(options, query);
    }
}
