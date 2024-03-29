﻿using Domain.Common;
using Domain.Entities.Commitment;
using Domain.Entities.Facility;
using Domain.Entities.Invoice;
using Domain.Entities.InvoiceSchedule;
using Domain.Entities.Notification;
using Domain.Entities.Ticket;
using Domain.Entities.User;
using Domain.Enums;
using Domain.Extensions;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.Room;
[Table("Rooms")]
public class RoomEntity : BaseEntity
{
    public string RoomName { get; set; }

    [Column("Room Status")]
    public string Status
    {
        get { return RoomStatus.ToString(); }
        private set { RoomStatus = value.ParseEnum<RoomStatus>(); }
    }

    [NotMapped]
    public RoomStatus RoomStatus { get; set; }

    public int? MaximumPeople { get; set; }
    public int NumOfWindows { get; set; }
    public int NumOfDoors { get; set; }
    public int NumOfBathRooms { get; set; }
    public int NumOfBedRooms { get; set; }
    public int NumOfWCs { get; set; }
    public double Area { get; set; }
    public double Length { get; set; }
    public double Width { get; set; }
    public double Height { get; set; }
    /*navigation props*/

    // 1 hostel - M rooms
    public Guid HostelId { get; set; }
    public HostelEntity Hostel { get; set; }

    // // 1 room - M facilities
    // public virtual ICollection<FacilityEntity> Facilities { get; set; }

    // M room - M tenants
    public virtual ICollection<RoomTenant> RoomTenants { get; set; }
    
    public virtual ICollection<FacilityManagement> FacilityManagements { get; set; }

    // 1 Manager (create) M Invoices (for) 1 Room
    public virtual ICollection<InvoiceEntity> ManagerCreatedInvoices { get; set; }

    // 1 Manager (make) M InvoiceSchedules (for) 1 Room
    public virtual ICollection<InvoiceScheduleEntity> ManegerCreatedInvoiceSchedules { get; set; }

    // 1 Manager (create) M Notifications (for) 1 Rooms
    public virtual ICollection<NotificationEntity> Notifications { get; set; }

    // 1 Tenant (create) M Tickets (for) 1 Room
    public virtual ICollection<TicketEntity> Tickets { get; set; }

    // M Commitment (belong to) 1 Room
    public virtual ICollection<CommitmentEntity> Commitments { get; set; }

}