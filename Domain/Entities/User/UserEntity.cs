using Domain.Common;
using Domain.Entities.Hostel;
using Domain.Entities.Invoice;
using Domain.Entities.InvoiceSchedule;
using Domain.Entities.Notification;
using Domain.Entities.Room;
using Domain.Enums;

namespace Domain.Entities;

public class UserEntity : BaseEntity
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Password { get; set; }
    public Role Role { get; set; }

    /*navigation props*/

    // 1 owner - M hostels
    public virtual ICollection<HostelEntity> Hostels { get; set; }

    // M manager - M hostels
    public virtual ICollection<HostelManagement> HostelManagements { get; set; }

    // M tenants - 1 room
    public Guid RoomId { get; set; }
    public RoomEntity Room { get; set; }

    // 1 tenannt - M invoices
    public virtual ICollection<InvoiceEntity> TenantPaidInvoices { get; set; }

    // 1 Manager (create) M Invoices (for) 1 Room
    public virtual ICollection<InvoiceEntity> ManagerCreatedInvoices { get; set; }

    // 1 Manager (make) M InvoiceSchedules (for) 1 Room
    public virtual ICollection<InvoiceScheduleEntity> ManegerCreatedInvoiceSchedules { get; set; }


    // 1 Manager (create) M Notifications (for) M Rooms
    public virtual ICollection<Notification_Room> ManagerCreatedRoomNotifications { get; set; }
}
