using Domain.Common;
using Domain.Entities.Room;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Notification;
[Table("Notifications")]
public class NotificationEntity : BaseEntity
{
    public string TransactionCode { get; set; }
    public DateTime Date { get; set; }
    public string Content { get; set; }
    public string Type { get; set; }
    public bool IsUnread { get; set; } = true;
    public bool IsSent { get; set; }

    /*navigation props*/

    // 1 Manager (create) M Notifications (for) 1 Rooms
    public Guid RoomId { get; set; }
    public RoomEntity Room { get; set; }
    public Guid ManagerId { get; set; }
    public UserEntity Manager { get; set; }

}
