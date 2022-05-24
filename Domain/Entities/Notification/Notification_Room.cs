using Domain.Common;
using Domain.Entities.Room;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Notification;
[Table("RoomNotification")]
public class Notification_Room : BaseEntity
{
    [Column(Order = 1)]
    public Guid ManagerId { get; set; }
    public UserEntity Manager { get; set; }

    [Column(Order = 2)]
    public Guid RoomId { get; set; }
    public RoomEntity Room{ get; set; }

    [Column(Order = 3)]
    public Guid NotificationId { get; set; }
    public NotificationEntity Notification { get; set; }
}
