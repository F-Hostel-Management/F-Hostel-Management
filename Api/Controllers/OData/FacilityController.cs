using Domain.Entities;
using Domain.Entities.Facility;
using Infrastructure.Contexts;

namespace Api.Controllers.OData;

public class FacilityController:BaseODataController<FacilityEntity>
{
    public FacilityController(ApplicationDbContext db) : base(db)
    {
    }

    protected override IQueryable<FacilityEntity> GetQuery()
    {
        var query = (from facility in db.Facilities
            join hostel in db.Hostels on facility.HostelId equals hostel.Id
            join management in db.HostelManagements on hostel.Id equals management.HostelId
            where hostel.OwnerId.Equals(CurrentUserId) || (management.ManagerId.Equals(CurrentUserId))
            select facility).Distinct();
        return query;
    }
}