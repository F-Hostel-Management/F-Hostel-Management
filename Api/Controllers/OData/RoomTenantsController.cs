using Application.Exceptions;
using Domain.Entities.Room;
using Domain.Entities.User;
using Domain.Enums;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers.OData
{
    [Authorize]
    public class RoomTenantsController : BaseODataController<RoomTenant>
    {
        public RoomTenantsController(ApplicationDbContext db) : base(db)
        {
        }

        protected override IQueryable<RoomTenant> GetQuery()
        {
            IQueryable<Guid> rooms = null;

            if (CurrentUser.Role.Equals(Role.Owner))
            {
                var hostels = db.Hostels.Where(hostel => hostel.OwnerId == CurrentUserId).Select(hostel => hostel.Id);
                rooms = db.Rooms.Where(room => hostels.Contains(room.HostelId)).Select(room => room.Id);
            }

            if (CurrentUser.Role.Equals(Role.Manager))
            {
                var hostels = db.HostelManagements.Where(hostelManagement => hostelManagement.ManagerId == CurrentUserId).Select(hostelManagement => hostelManagement.HostelId);
                rooms = db.Rooms.Where(room => hostels.Contains(room.HostelId)).Select(room => room.Id);
            }

            if (CurrentUser.Role.Equals(Role.Tenant))
            {
                rooms = db.RoomTenants.Where(roomTenant => roomTenant.TenantId == CurrentUserId).Select(roomTenant => roomTenant.RoomId);
            }

            var roomTenants = db.RoomTenants.Where(roomTenant => rooms.Contains(roomTenant.RoomId));
            return roomTenants;
        }
    }
}
