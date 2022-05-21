using Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Room;
[Table("Room")]
public class RoomEntity : BaseEntity
{
    public string RoomName { get; set; }
    public int NumOfWindows { get; set; }
    public int NumOfDoors { get; set; }
    public int NumOfBathRooms { get; set; }
    public int NumOfWCs { get; set; }
    public double Price { get; set; }
    public double Area { get; set; }
    public double Length { get; set; }
    public double Width { get; set; }
    public int Height { get; set; }
    /*navigation props*/

    // type
    public Guid RoomTypeId { get; set; }
    public RoomType RoomType { get; set; }

    // hostel
    public Guid HostelId { get; set; }
    public HostelEntity Hostel { get; set; }

}
