using Api.UserFeatures.Requests;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using AutoMapper;
using Domain.Entities.Notification;
using Domain.Entities.Room;

namespace Api.Controllers.Rest.Notification;

public class HandleNotificationRequest
{
    private readonly IGenericRepository<NotificationEntity> _notificationsRepository;
    private readonly IGenericRepository<RoomEntity> _roomRepository;
    private readonly IAuthorizationServices _authorServices;

    public HandleNotificationRequest
        (IGenericRepository<NotificationEntity> notificationsRepository,
        IGenericRepository<RoomEntity> roomRepository,
        IAuthorizationServices authorServices)
    {
        _notificationsRepository = notificationsRepository;
        _authorServices = authorServices;
        _roomRepository = roomRepository;

    }

    public async Task<IList<NotificationEntity>> GetValidListFromRequest
        (CreateNotificationRequest req, Guid managerId, bool isSent)
    {
        IList<NotificationEntity> notifications = new List<NotificationEntity>();
        foreach (Guid i in req.RoomIds)
        {
            RoomEntity room = await _authorServices.RoomThatManageByCurrentUser(i, managerId);
            if (room is null)
            {
                throw new ForbiddenException("Forbidden");
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

    public async Task<IList<NotificationEntity>> GetValidListFromRepoAndUpdate
        (CreateNotificationRequest req, Guid managerId, IMapper Mapper)
    {
        IList<NotificationEntity> notifications = new List<NotificationEntity>();
        foreach (Guid i in req.RoomIds)
        {
            RoomEntity room = await _authorServices.RoomThatManageByCurrentUser(i, managerId);
            if (room is null)
            {
                throw new ForbiddenException("Forbidden");
            }
            if (!room.HostelId.Equals(req.HostelId))
            {
                throw new BadRequestException("Cannot access");
            }

            NotificationEntity uEntity = await _notificationsRepository.FirstOrDefaultAsync(noti =>
               noti.TransactionId.Equals(req.TransactionId) && noti.RoomId.Equals(i));
            if (uEntity == null)
            {
                throw new NotFoundException("Not found");
            }
            Mapper.Map(req, uEntity);
            notifications.Add(uEntity);
        }
        return notifications;
    }
}
