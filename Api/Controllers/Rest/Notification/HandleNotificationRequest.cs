using Api.UserFeatures.Requests;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using AutoMapper;
using Domain.Entities.Notification;

namespace Api.Controllers.Rest.Notification;

public class HandleNotificationRequest
{
    private readonly IGenericRepository<NotificationEntity> _notificationsRepository;
    private readonly IAuthorizationServices _authorServices;

    public HandleNotificationRequest
        (IGenericRepository<NotificationEntity> notificationsRepository,
        IAuthorizationServices authorServices)
    {
        _notificationsRepository = notificationsRepository;
        _authorServices = authorServices;
    }

    public async Task<IList<NotificationEntity>> GetValidListFromRequest
        (CreateNotificationRequest req, Guid managerId, bool isSent)
    {
        IList<NotificationEntity> notifications = new List<NotificationEntity>();
        foreach (Guid i in req.RoomIds)
        {
            bool IsRoomManageByCurrentUser = await _authorServices.IsRoomManageByCurrentUser(i, managerId);
            if (!IsRoomManageByCurrentUser)
            {
                throw new ForbiddenException("Forbidden");
            }
            notifications.Add(new NotificationEntity()
            {
                TransactionCode = req.TransactionCode,
                Date = DateTime.Now,
                Content = req.Content,
                Type = req.Type,
                RoomId = i,
                ManagerId = managerId,
                IsSent = isSent
            });

        }
        return notifications;
    }

    public async Task<IList<NotificationEntity>> GetValidListFromRepoAndUpdate
        (CreateNotificationRequest req, Guid managerId, bool isSent, IMapper Mapper)
    {
        IList<NotificationEntity> notifications = new List<NotificationEntity>();
        foreach (Guid i in req.RoomIds)
        {
            bool IsRoomManageByCurrentUser = await _authorServices.IsRoomManageByCurrentUser(i, managerId);
            if (!IsRoomManageByCurrentUser)
            {
                throw new ForbiddenException("Forbidden");
            }
            NotificationEntity uEntity = await _notificationsRepository.FirstOrDefaultAsync(noti =>
               noti.TransactionCode.Equals(req.TransactionCode) && noti.RoomId.Equals(i));
            if (uEntity == null)
            {
                throw new NotFoundException("Not found");
            }
            Mapper.Map(req, uEntity);
            uEntity.IsSent = isSent;
            notifications.Add(uEntity);
        }
        return notifications;
    }
}
