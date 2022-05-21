using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Room;
public class RoomType : BaseEntity, Category
{
    public string CategoryName { get; set; }
    /*navigation props*/
    
    // room
    public virtual ICollection<RoomEntity> Rooms{ get; set; }
}
