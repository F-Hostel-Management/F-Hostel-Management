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

[Table("Hostel")]
public class HostelEntity : BaseEntity
{
    public string Address { get; set; }
    public string Name { get; set; }

    /*navigation props*/

    // category 
    public Guid HostelCategoryId { get; set; }
    public HostelCategory HostelCategory { get; set; }

    // owner
    public Guid OwnerId { get; set; }
    public UserEntity Owner { get; set; }

    // manager
    public virtual ICollection<HostelManagement> HostelManagements { get; set; }

    // room
    public virtual ICollection<RoomEntity> Rooms { get; set; }

}
