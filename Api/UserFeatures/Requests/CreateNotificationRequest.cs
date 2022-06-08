using Api.Mappings;
using Domain.Entities.Notification;
using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests;

public class CreateNotificationRequest : IMapTo<NotificationEntity>
{
    public Guid? TransactionId { get; set; }
    [Required]
    public string Content { get; set; }
    [Required]
    public string Type { get; set; }
    [Required]
    public Guid[] RoomIds { get; set; }
}
