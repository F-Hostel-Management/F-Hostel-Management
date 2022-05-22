using Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Notification;
[Table("Notification")]
public class NotificationEntity : BaseEntity
{
    public string NotificationCode { get; set; }
    public DateTime Date { get; set; }
    public string Content { get; set; }

    /*navigation props*/

    // 1 category - M notifications
    public Guid NotificationCategoryId { get; set; }
    public NotificationCategory NotificationCategory { get; set; }

    // 1 Manager (create) M Notifications (for) M Rooms
    public virtual ICollection<Notification_Room> RoomNotifications { get; set; }

}
