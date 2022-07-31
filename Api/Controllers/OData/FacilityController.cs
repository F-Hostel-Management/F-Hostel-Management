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
            join d in db.HostelManagements on hostel.Id equals d.HostelId into dept
            from management in dept.DefaultIfEmpty()
                 // from management in db.HostelManagements //where hostel.Id == management.HostelId
            where hostel.OwnerId.Equals(CurrentUserId) || (management.ManagerId.Equals(CurrentUserId) && management.HostelId.Equals(hostel.Id))
            select facility).Distinct();
        return query;
    }
}