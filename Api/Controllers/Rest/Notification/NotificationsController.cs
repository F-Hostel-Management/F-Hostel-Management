using Api.Controllers.Rest.Notification;
using Api.UserFeatures.Requests;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Utilities;
using Domain.Constants;
using Domain.Entities.Notification;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest;

public class NotificationsController : BaseRestController
{
    private readonly IGenericRepository<NotificationEntity> _notificationsRepository;
    private readonly IAuthorizationServices _authorServices;
    private readonly HandleNotificationRequest _reqHandler;

    public NotificationsController
        (IGenericRepository<NotificationEntity> notificationsRepository,
        IAuthorizationServices authorServices,
        HandleNotificationRequest reqHandler)
    {
        _notificationsRepository = notificationsRepository;
        _authorServices = authorServices;
        _reqHandler = reqHandler;
    }



    /// <summary>
    /// owner || manager press cancel create notification button 
    /// </summary>
    /// <returns></returns>
    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPost("create-but-cancel")]
    public async Task<IActionResult> CreateButCancelNotificationsAsync
        ([FromBody] CreateNotificationRequest req)
    {
        IList<NotificationEntity> notifications = new List<NotificationEntity>();
        bool isSent = false;
        if (req.TransactionCode is null)
        {
            // create ==> issent false
            req.TransactionCode = CodeGeneratorUtil.genarateByNowDateTime();
            notifications = await _reqHandler.GetValidListFromRequest(req, CurrentUserID, isSent);
            await _notificationsRepository.CreateRangeAsync(notifications);
        }
        else
        {
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
        IList<NotificationEntity> notifications = new List<NotificationEntity>();
        bool isSent = true;

        if (req.TransactionCode is null)
        {
            // create issent true
            req.TransactionCode = CodeGeneratorUtil.genarateByNowDateTime();
            notifications = await _reqHandler.GetValidListFromRequest(req, CurrentUserID, isSent);
            await _notificationsRepository.CreateRangeAsync(notifications);
        }
        else
        {
            // update issent true
            notifications = await _reqHandler.GetValidListFromRepoAndUpdate(req, CurrentUserID, isSent, Mapper);
            await _notificationsRepository.UpdateRangeAsync(notifications);
        }
        return Ok(notifications);
    }


    [HttpGet("transaction/{transactionCode}")]
    public async Task<IActionResult> GetNotiStransactionAsync
        (string transactionCode)
    {
        IList<NotificationEntity> notifications = await _notificationsRepository.WhereAsync(noti =>
        noti.TransactionCode.Equals(transactionCode));
        if (notifications.Count == 0)
        {
            throw new NotFoundException("Not found transaction");
        }
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
