using Api.UserFeatures.Requests;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Utilities;
using Domain.Entities.Notification;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest;

public class NotificationsController : BaseRestController
{
    private readonly IGenericRepository<NotificationEntity> _notificationsRepository;
    private readonly IAuthorizationServices _authorServices;

    public NotificationsController
        (IGenericRepository<NotificationEntity> notificationsRepository,
        IAuthorizationServices authorServices)
    {
        _notificationsRepository = notificationsRepository;
        _authorServices = authorServices;
    }


    /// <summary>
    /// owner || manager create notification for room
    /// </summary>
    /// <returns></returns>
    [HttpPost]
    public async Task<IActionResult> SendNotificationAsync
        ([FromBody] CreateNotificationRequest req)
    {

        List<NotificationEntity> notifications = new List<NotificationEntity>();
        foreach (Guid i in req.RoomIds)
        {
            bool IsRoomManageByCurrentUser = await _authorServices.IsRoomManageByCurrentUser(i, CurrentUserID);
            if (!IsRoomManageByCurrentUser)
            {
                throw new ForbiddenException("Cannot send notifications");
            }
            notifications.Add(new NotificationEntity()
            {
                TransactionCode = CodeGeneratorUtil.genarateByNowDateTime(),
                Date = DateTime.Now,
                Content = req.Content,
                Type = req.Type,
                RoomId = i,
                ManagerId = CurrentUserID
            });
        }
        try
        {
            await _notificationsRepository.CreateRangeAsync(notifications);
        } catch 
        {
            throw new BadRequestException("Cannot create notifications");
        }
        return Ok(notifications);
    }
}
