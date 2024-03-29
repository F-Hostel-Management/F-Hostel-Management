﻿using Domain.Common;
using Domain.Entities.Commitment;
using Domain.Entities.Facility;
using Domain.Entities.Hostel;
using Domain.Entities.Notification;
using Domain.Entities.Room;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("Hostels")]
public class HostelEntity : BaseEntity
{
    public string Address { get; set; }
    public string Name { get; set; }
    public int? NumOfRooms { get; set; }
    public string ImgPath { get; set; }

    public int QrTimeSpan { get; set; } = 15;

    /*navigation props*/

    // 1 owner - M hostels
    public Guid OwnerId { get; set; }
    public UserEntity Owner { get; set; }

    // M managers - M hostels
    public virtual ICollection<HostelManagement> HostelManagements { get; set; }

    // 1 hostel - M rooms
    public virtual ICollection<RoomEntity> Rooms { get; set; }

    // 1 hostel - m com
    public virtual ICollection<CommitmentEntity> Commitments { get; set; }
    
    public virtual ICollection<FacilityEntity> Facilities { get; set; }

    // 1 user M trans notifications 1 hostel
    public virtual ICollection<NotificationTransaction> NotificationTransactions { get; set; }

}
