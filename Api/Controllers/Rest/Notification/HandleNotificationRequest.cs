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

    public HandleNotificationRequest
        (IGenericRepository<NotificationEntity> notificationsRepository)
    {
        _notificationsRepository = notificationsRepository;
    }

    public async Task<IList<NotificationEntity>> GetValidListFromRequest
        (CreateNotificationRequest req, IMapper Mapper)
    {
        IList<NotificationEntity> notifications = new List<NotificationEntity>();
        foreach (Guid i in req.RoomIds)
        {
            NotificationEntity noti = Mapper.Map<NotificationEntity>(req);
            noti.Date = DateTime.Now;
            noti.RoomId = i;
            notifications.Add(noti);
        }
        return notifications;
    }

    public async Task<IList<NotificationEntity>> GetUnsentValidListFromRepoAndUpdate
       (CreateNotificationRequest req, IMapper Mapper)
    {
        IList<NotificationEntity> notifications = new List<NotificationEntity>();

        var roomIdsInATransaction = (await _notificationsRepository.WhereAsync(noti =>
        noti.TransactionId.Equals(req.TransactionId))).Select(noti => noti.RoomId).ToArray();
        
        var diff = req.RoomIds.Except(roomIdsInATransaction).ToArray();
        if (diff.Any())
        {
            req.RoomIds = req.RoomIds.Except(diff).ToArray();
            foreach (Guid i in diff)
            {
                NotificationEntity uEntity = Mapper.Map<NotificationEntity>(req);
                uEntity.Date = DateTime.Now;
                uEntity.RoomId = i;
                notifications.Add(uEntity);
            }
        }
        foreach (Guid i in req.RoomIds)
        {
            NotificationEntity uEntity = await _notificationsRepository.FirstOrDefaultTrackingAsync(noti =>
               noti.TransactionId.Equals(req.TransactionId) && noti.RoomId.Equals(i));
            // noti has been send
            if (uEntity.NotificationStage == NotificationStage.Sent)
            {
                throw new BadRequestException("Cannot access");
            }
            Mapper.Map(req, uEntity);
            uEntity.Date = DateTime.Now;
            notifications.Add(uEntity);
        }
        return notifications;
    }
}
