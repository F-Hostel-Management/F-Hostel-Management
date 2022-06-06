using Domain.Common;
using Domain.Entities.Commitment;
using Domain.Entities.Hostel;
using Domain.Entities.Invoice;
using Domain.Entities.InvoiceSchedule;
using Domain.Entities.Message;
using Domain.Entities.Notification;
using Domain.Entities.Room;
using Domain.Entities.Ticket;
using Domain.Entities.User;
using Domain.Enums;
using Domain.Extensions;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

public class UserEntity : BaseEntity
{

    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }

    
    [Column("Role")]
    public string RoleString
    {
        get { return Role.ToString(); }
        private set { Role = value.ParseEnum<Role>(); }
    }

    [NotMapped]
    public Role Role { get; set; }

    public DateTime DateOfBirth { get; set; }

    [Column("Gender")]
    public string GenderString
    {
        get { return Gender.ToString(); }
        private set { Gender = value.ParseEnum<Gender>(); }
    }

    [NotMapped]
    public Gender Gender { get; set; }

    public string TaxCode { get; set; }
    public string CardNumber { get; set; }
    public string Address { get; set; }
    
    public string OrganizationCode { get; set; }
    public string Avatar { get; set; }
    public string FrontIdentification { get; set; }
    public string BackIdentification { get; set; }

    /*navigation props*/

    // 1 owner - M hostels
    public virtual ICollection<HostelEntity> Hostels { get; set; }

    // M manager - M hostels
    public virtual ICollection<HostelManagement> HostelManagements { get; set; }

    // M tenants - M room
    public virtual ICollection<RoomTenant> RoomTenants { get; set; }

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

    // 1 Owner manage M manager
    public Guid? OwnerId { get; set; }
    public UserEntity Owner { get; set; }

    // 1 user M commitments
    public virtual ICollection<CommitmentEntity> ManagerCommitments { get; set; }
    public virtual ICollection<CommitmentEntity> TenantCommitments { get; set; }
    public virtual ICollection<CommitmentEntity> OwnerCommitments { get; set; }


}
