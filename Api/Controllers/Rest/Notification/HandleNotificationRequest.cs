using Api.UserFeatures.Requests;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using AutoMapper;
using Domain.Entities.Notification;
using Domain.Entities.Room;
using Domain.Enums;

namespace Api.Controllers.Rest.Notification;

public class HandleNotificationRequest
{
    private readonly IGenericRepository<NotificationEntity> _notificationsRepository;
    private readonly IGenericRepository<RoomEntity> _roomRepository;
    private readonly IAuthorizationServices _authorServices;

    public HandleNotificationRequest
        (IGenericRepository<NotificationEntity> notificationsRepository)
    {
        _notificationsRepository = notificationsRepository;
        _authorServices = authorServices;
        _roomRepository = roomRepository;

    }

    public async Task<IList<NotificationEntity>> GetValidListFromRequest
    {
        IList<NotificationEntity> notifications = new List<NotificationEntity>();
        foreach (Guid i in req.RoomIds)
        {
            }
            if (!room.HostelId.Equals(req.HostelId))
            {
                throw new BadRequestException("Cannot access");
            }
            notifications.Add(new NotificationEntity()
            {
                TransactionId = (Guid)req.TransactionId,
                Date = DateTime.Now,
                Content = req.Content,
                Type = req.Type,
                RoomId = i,
                IsSent = isSent
            });

        }
        return notifications;
    }

    public async Task<IList<NotificationEntity>> GetUnsentValidListFromRepoAndUpdate
    {
        IList<NotificationEntity> notifications = new List<NotificationEntity>();
        {
            {
            }
            {
               noti.TransactionId.Equals(req.TransactionId) && noti.RoomId.Equals(i));
            if (uEntity == null)
            {
                throw new NotFoundException("Not found");
            }
            // noti has been send
            {
                throw new BadRequestException("Cannot access");
            }
            notifications.Add(uEntity);
        }
        return notifications;
    }
}
