using Domain.Common;

namespace Domain.Entities.Notification;
public class NotificationTransaction : BaseEntity
{
    public string TransactionCode { get; set; }
    public Guid ManagerId { get; set; }
    public UserEntity Manager { get; set; }
    public Guid HostelId { get; set; }
    public HostelEntity Hostel { get; set; }
    public virtual ICollection<NotificationEntity> Notifications { get; set; }
}
