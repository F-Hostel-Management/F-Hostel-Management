using Domain.Common;
using Domain.Entities.Hostel;
using Domain.Entities.Room;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities;

[Table("Hostels")]
public class HostelEntity : BaseEntity
{
    public string Address { get; set; }
    public string Name { get; set; }
    public int? NumOfRooms { get; set; }
    public string? ImgPath { get; set; }

    /*navigation props*/

    // 1 type - M hostels 
    public Guid HostelCategoryId { get; set; }
    public HostelCategory HostelCategory { get; set; }

    // 1 owner - M hostels
    public Guid OwnerId { get; set; }
    public UserEntity Owner { get; set; }

    // M managers - M hostels
    public virtual ICollection<HostelManagement> HostelManagements { get; set; }

    // 1 hostel - M rooms
    public virtual ICollection<RoomEntity> Rooms { get; set; }

}
