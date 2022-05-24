using Domain.Common;
using Domain.Entities.Commitment;
using Domain.Entities.Hostel;
using Domain.Entities.Invoice;
using Domain.Entities.InvoiceSchedule;
using Domain.Entities.Message;
using Domain.Entities.Notification;
using Domain.Entities.Room;
using Domain.Entities.Ticket;
using Domain.Enums;
using Domain.Extensions;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

public class UserEntity : BaseEntity
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Password { get; set; }
    
    [Column("Role")]
    public string RoleString
    {
        get { return Role.ToString(); }
        private set { Role = value.ParseEnum<Role>(); }
    }

    [NotMapped]
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

    // 1 ticket - M messages
    public virtual ICollection<MessageEntity> Messages { get; set; }

    // 1 Tenant (create) M Tickets (for) 1 Room
    public virtual ICollection<TicketEntity> Tickets { get; set; }


    // 1 Commitment (belong to) 1 Manager
    public CommitmentEntity Commitment { get; set; }

    // M Commitments (belong to ) M Teanants
    public virtual ICollection<CommitmentContains> CommitmentContains { get; set; }

}
