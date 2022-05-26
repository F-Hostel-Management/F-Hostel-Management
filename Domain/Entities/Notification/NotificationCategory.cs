using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Notification;
public class NotificationCategory : BaseEntity, Category
{
    public string CategoryName { get; set; }

    /*navigation props*/

    // 1 category - M notifications
    public virtual ICollection<NotificationEntity> Notifications { get; set; }
}
