using Domain.Entities.Invoice;
using Domain.Enums;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.OData.Query;

namespace Api.Controllers.OData
{
    [Authorize]
    public class InvoicesController : BaseODataController<InvoiceEntity>
    {
        public InvoicesController(ApplicationDbContext db) : base(db)
        {
        }

        protected override IQueryable<InvoiceEntity> GetQuery()
        {
            IQueryable<InvoiceEntity> query = base.GetQuery();

            IQueryable<Guid> rooms;
            if (CurrentUser.Role.Equals(Role.Tenant))
            {
                var roomTenants = db.RoomTenants.Where(roomTenant => roomTenant.TenantId.Equals(CurrentUserId)).Select(roomTenant => roomTenant.RoomId);
                rooms = db.Rooms.Where(room => roomTenants.Contains(room.Id)).Select(room => room.Id);
            }
            else
            {
                var hostels = db.Hostels
                     .Where(hostel => hostel.OwnerId.Equals(CurrentUser.OwnerId) || hostel.OwnerId.Equals(CurrentUser.Id))
                     .Select(hostel => hostel.Id);
                rooms = db.Rooms.Where(room => hostels.Contains(room.HostelId)).Select(room => room.Id);
            }

            var invoices = db.Invoices.Where(invoice => rooms.Contains(invoice.RoomId));
            return invoices;

        }
    }
}
