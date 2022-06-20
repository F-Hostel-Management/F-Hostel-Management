using Application.Exceptions;
using Domain.Constants;
using Domain.Entities.InvoiceSchedule;
using Domain.Enums;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers.OData;

[Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
public class InvoiceSchedulesController : BaseODataController<InvoiceScheduleEntity>
{
    public InvoiceSchedulesController(ApplicationDbContext db) : base(db)
    {
    }

    protected override IQueryable<InvoiceScheduleEntity> GetQuery()
    {
        IQueryable<Guid> rooms = null;
        if (CurrentUser.Role.Equals(Role.Owner) || CurrentUser.Role.Equals(Role.Manager))
        {
            var hostels = db.Hostels
                 .Where(hostel => hostel.OwnerId.Equals(CurrentUser.OwnerId) || hostel.OwnerId.Equals(CurrentUser.Id))
                 .Select(hostel => hostel.Id);
            rooms = db.Rooms.Where(room => hostels.Contains(room.HostelId)).Select(room => room.Id);
        }
        if (rooms is null) throw new NotFoundException("Not found any room");
        var invoices = db.InvoiceSchedules.Where(invoice => rooms.Contains(invoice.RoomId));
        return invoices;
    }
}
