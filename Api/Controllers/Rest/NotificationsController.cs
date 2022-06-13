using Api.Services;
using Api.UserFeatures.Requests;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Constants;
using Domain.Entities;
using Domain.Entities.Commitment;
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
    private readonly IGenericRepository<CommitmentEntity> _commitmentRepository;
    private readonly IAuthorizationServices _authorServices;
    private readonly HandleNotificationRequest _reqHandler;

    public NotificationsController
        (IGenericRepository<NotificationEntity> notificationsRepository,
        IGenericRepository<NotificationTransaction> transactionRepository,
        IGenericRepository<CommitmentEntity> commitmentRepository,
        IAuthorizationServices authorServices,
        HandleNotificationRequest reqHandler)
    {
        _notificationsRepository = notificationsRepository;
        _transactionRepository = transactionRepository;
        _commitmentRepository = commitmentRepository;
        _authorServices = authorServices;
        _reqHandler = reqHandler;
    }

    /// <summary>
    /// send notis for chose room
    /// </summary>
    /// <param name="req"></param>
    /// <returns></returns>
    /// <exception cref="ArgumentException"></exception>
    /// <exception cref="NotFoundException"></exception>
    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPost("send")]
    public async Task<IActionResult> SendNotificationsAsync
        ([FromBody] CreateNotificationRequest req)
    {
        if (!req.RoomIds.Any())
        {
            throw new ArgumentException();
        }
        // validation req
        await _authorServices.VerifiedRoomsInAHostelThatManagedByCurrentUser(req.RoomIds, req.HostelId, CurrentUserID);
        IList<NotificationEntity> notifications;

        if (req.TransactionId is null)
        {
            NotificationTransaction transaction = new()
            {
                Id = Guid.NewGuid(),
                ManagerId = CurrentUserID
            };

            req.TransactionId = transaction.Id;
            notifications = _reqHandler.GetValidListFromRequest(req, Mapper);
            transaction.HostelId = req.HostelId;
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
            if (!transaction.HostelId.Equals(req.HostelId))
            {
                throw new BadRequestException("Cannot access");
            }
            notifications = await _reqHandler.GetUnsentValidListFromRepoAndUpdate(req, Mapper);
            await _notificationsRepository.UpdateRangeAsync(notifications);
        }
        return Ok();
    }

    /// <summary>
    /// get all notis of a transaction
    /// </summary>
    /// <param name="transactionId"></param>
    /// <returns></returns>
    /// <exception cref="NotFoundException"></exception>
    /// <exception cref="ForbiddenException"></exception>
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

    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpDelete("transaction/{transactionId}")]
    public async Task<IActionResult> DeleteNotiStransactionAsync
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
        transaction.IsDeleted = true;
        await _transactionRepository.UpdateAsync(transaction);
        return Ok();
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

        if (noti.NotificationStage != NotificationStage.Sent)
        {
            throw new BadRequestException("Cannot access");
        }

        var commitments = (await _commitmentRepository.WhereAsync(c =>
           c.RoomId.Equals(noti.RoomId))).OrderByDescending(com => com.EndDate);

        if (!commitments.Any())
        {
            throw new BadRequestException("Cannot access");
        }
        var currentCommitment = commitments.First();

        bool isCurrentUserRentingTheRoom = await _authorServices.IsCurrentUserRentingTheRoom(currentCommitment, CurrentUserID);
        if (!isCurrentUserRentingTheRoom)
        {
            throw new ForbiddenException("Forbidden");
        }
        noti.IsUnread = false;
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

        if (noti.NotificationStage != NotificationStage.Sent)
        {
            throw new BadRequestException("Cannot access");
        }

        var commitments = (await _commitmentRepository.WhereAsync(c =>
            c.RoomId.Equals(noti.RoomId))).OrderByDescending(com => com.EndDate);

        if (!commitments.Any())
        {
            throw new BadRequestException("Cannot access");
        }
        var currentCommitment = commitments.First();

        bool isCurrentUserRentingTheRoom = await _authorServices.IsCurrentUserRentingTheRoom(currentCommitment, CurrentUserID);
        if (!isCurrentUserRentingTheRoom)
        {
            throw new ForbiddenException("Forbidden");
        }
        noti.IsDeleted = true;
        await _notificationsRepository.UpdateAsync(noti);
        return Ok();
    }

    [AllowAnonymous]
    [HttpGet("test/{roomId}")]
    public async Task<IActionResult> GetTest(Guid roomId)
    {
        var commitments = (await _commitmentRepository.WhereAsync(c =>
            c.RoomId.Equals(roomId))).OrderByDescending(com => com.EndDate).Select(com => com.EndDate);
        return Ok(commitments);
    }
}
