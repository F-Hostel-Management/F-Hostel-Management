using Api.Controllers.Rest.Notification;
using Api.UserFeatures.Requests;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Utilities;
using Domain.Constants;
using Domain.Entities;
using Domain.Entities.Notification;
using Domain.Entities.Room;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest;

public class NotificationsController : BaseRestController
{
    private readonly IGenericRepository<NotificationEntity> _notificationsRepository;
    private readonly IGenericRepository<NotificationTransaction> _transactionRepository;
    private readonly IGenericRepository<HostelEntity> _hostelRepository;
    private readonly IGenericRepository<RoomEntity> _roomRepository;
    private readonly IAuthorizationServices _authorServices;
    private readonly HandleNotificationRequest _reqHandler;

    public NotificationsController
        (IGenericRepository<NotificationEntity> notificationsRepository,
        IGenericRepository<NotificationTransaction> transactionRepository,
        IGenericRepository<HostelEntity> hostelRepository,
        IGenericRepository<RoomEntity> roomRepository,
        IAuthorizationServices authorServices,
        HandleNotificationRequest reqHandler)
    {
        _notificationsRepository = notificationsRepository;
        _authorServices = authorServices;
        _reqHandler = reqHandler;
        _transactionRepository = transactionRepository;
        _hostelRepository = hostelRepository;
        _roomRepository = roomRepository;
    }


    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPost("create-but-cancel")]
    public async Task<IActionResult> CreateButCancelNotificationsAsync
        ([FromBody] CreateNotificationRequest req)
    {
        if (!req.RoomIds.Any())
        {
            throw new ArgumentException();
        }
        IList<NotificationEntity> notifications = new List<NotificationEntity>();
        bool isSent = false;     

        if (req.TransactionId is null)
        {
            // create ==> issent false
            NotificationTransaction transaction = new NotificationTransaction()
            {
                Id = Guid.NewGuid(),
                TransactionCode = CodeGeneratorUtil.genarateByNowDateTime(),
                ManagerId = CurrentUserID
            };

            req.TransactionId = transaction.Id;
            notifications = await _reqHandler.GetValidListFromRequest(req, CurrentUserID, isSent);
            RoomEntity room = await _roomRepository.FindByIdAsync(req.RoomIds[0]);
            HostelEntity hostel = await _hostelRepository.FindByIdAsync(room.HostelId);
            transaction.HostelId = hostel.Id;
            await _transactionRepository.CreateAsync(transaction);
            await _notificationsRepository.CreateRangeAsync(notifications);
        }
        else
        {
            NotificationTransaction transaction = await _transactionRepository.FindByIdAsync((Guid)req.TransactionId);
            if (transaction is null)
            {
                throw new NotFoundException("Transcantion not found");
            }
            // load db end update if any ==> issent still false
            notifications = await _reqHandler.GetValidListFromRepoAndUpdate(req, CurrentUserID, isSent, Mapper);
            await _notificationsRepository.UpdateRangeAsync(notifications);
        }
        return Ok(notifications);
    }

    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPost("send")]
    public async Task<IActionResult> SendNotificationsAsync
        ([FromBody] CreateNotificationRequest req)
    {
        if (!req.RoomIds.Any())
        {
            throw new ArgumentException();
        }
        IList<NotificationEntity> notifications = new List<NotificationEntity>();
        bool isSent = true;

        if (req.TransactionId is null)
        {
            NotificationTransaction transaction = new NotificationTransaction()
            {
                TransactionCode = CodeGeneratorUtil.genarateByNowDateTime(),
                ManagerId = CurrentUserID
            };

            req.TransactionId = transaction.Id;
            notifications = await _reqHandler.GetValidListFromRequest(req, CurrentUserID, isSent);
            RoomEntity room = await _roomRepository.FindByIdAsync(req.RoomIds[0]);
            HostelEntity hostel = await _hostelRepository.FindByIdAsync(room.HostelId);
            transaction.HostelId = hostel.Id;
            await _transactionRepository.CreateAsync(transaction);
            await _notificationsRepository.CreateRangeAsync(notifications);
        }
        else
        {
            // update issent true
            NotificationTransaction transaction = await _transactionRepository.FindByIdAsync((Guid)req.TransactionId);
            if (transaction is null)
            {
                throw new NotFoundException("Transcantion not found");
            }
            notifications = await _reqHandler.GetValidListFromRepoAndUpdate(req, CurrentUserID, isSent, Mapper);
            await _notificationsRepository.UpdateRangeAsync(notifications);
        }
        return Ok(notifications);
    }

    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpGet("transaction/{transactionId}")]
    public async Task<IActionResult> GetNotiStransactionAsync
        ([FromRoute] Guid transactionId)
    {
        NotificationTransaction transaction = await _transactionRepository.FindByIdAsync(transactionId);
        if (transaction is null)
        {
            throw new NotFoundException("Transaction not found");
        }
        bool isManagedByCurrentUser = await _authorServices.IsHostelManagedByCurrentUser(transaction.HostelId, CurrentUserID);
        if (!isManagedByCurrentUser)
        {
            throw new ForbiddenException("Cannot access the request");
        }
        IList<NotificationEntity> notifications = await _notificationsRepository.WhereAsync(noti =>
        noti.TransactionId.Equals(transactionId));
        return Ok(notifications);
    }

    [Authorize(Roles = nameof(Role.Tenant))]
    [HttpGet("{notiId}")]
    public async Task<IActionResult> ReadNotificationAsync([FromRoute] Guid notiId)
    {
        NotificationEntity noti = await _notificationsRepository.FindByIdAsync(notiId);
        if (noti == null)
        {
            throw new NotFoundException("Not found notification");
        }
        //noti.IsUnread = false;
        await _notificationsRepository.UpdateAsync(noti);
        return Ok(noti);
    }

    [Authorize(Roles = nameof(Role.Tenant))]
    [HttpDelete("{notiId}")]
    public async Task<IActionResult> DeleteNotificationAsync([FromRoute] Guid notiId)
    {
        var noti = await _notificationsRepository.FindByIdAsync(notiId);
        if (noti == null)
        {
            throw new NotFoundException("Not found notification");
        }
        noti.IsDeleted = true;
        await _notificationsRepository.UpdateAsync(noti);
        return Ok();
    }
}
