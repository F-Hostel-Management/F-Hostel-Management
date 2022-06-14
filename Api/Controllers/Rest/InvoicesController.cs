using Api.UserFeatures.Requests;
using Application.AppConfig;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Utilities;
using Domain.Constants;
using Domain.Entities;
using Domain.Entities.Invoice;
using Domain.Enums;
using Google.Apis.Util;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Api.Controllers.Rest;

public class InvoicesController : BaseRestController
{
    private readonly IGenericRepository<InvoiceEntity> _invoiceRepository;
    private readonly IGenericRepository<UserEntity> _userRepository;
    private readonly IRoomServices _roomService;
    private readonly IAuthorizationServices _authorServices;
    private readonly IInvoiceService _invoiceService;
    private readonly IPaymentService _paymentService;
    private readonly AppSettings _appSettings;

    public InvoicesController(IGenericRepository<InvoiceEntity> invoiceRepository, IRoomServices roomService, IGenericRepository<UserEntity> userRepository,
        IAuthorizationServices authorServices, IInvoiceService invoiceService, IPaymentService paymentService, IOptions<AppSettings> appSettings)
    {
        _invoiceRepository = invoiceRepository;
        _roomService = roomService;
        _userRepository = userRepository;
        _authorServices = authorServices;
        _invoiceService = invoiceService;
        _paymentService = paymentService;
        _appSettings = appSettings.Value;
    }

    /// <summary>
    /// Owner || Manager create invoice by room id
    /// </summary>
    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPost("{roomId}")]

    public async Task<IActionResult> CreateInvoiceAsync([FromRoute] Guid roomId, CreateInvoiceRequest request)
    {
        var hasPermission = await _authorServices.IsRoomManageByCurrentUser(roomId, CurrentUserID);
        if (!hasPermission) throw new ForbiddenException($"User is not the owner or manager of the room");

        var invoice = Mapper.Map<InvoiceEntity>(request);
        invoice.InvoiceCode = CodeGeneratorUtil.genarateByNowDateTime();
        invoice.Date = DateTime.Now;
        invoice.RoomId = roomId;
        invoice.ManagerId = CurrentUserID;
        invoice.TenantPaid = null;
        await _invoiceRepository.CreateAsync(invoice);

        return Ok();
    }

    /// <summary>
    /// Owner || Manager update invoice by id
    /// </summary>
    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateInvoiceAsync([FromRoute] Guid id, UpdateInvoiceRequest request)
    {
        var invoice = await _invoiceRepository.FindByIdAsync(id);
        if (invoice == null) throw new NotFoundException($"Invoice not found");

        var roomId = invoice.RoomId;
        var hasPermission = await _authorServices.IsRoomManageByCurrentUser(roomId, CurrentUserID);
        if (!hasPermission) throw new ForbiddenException($"User is not the owner or manager of the room");

        var canModify = await _invoiceService.CanModifyAsync(invoice);
        if (!canModify) throw new BadRequestException($"Can not update when the invoice has been paid");

        Mapper.Map(request, invoice);
        await _invoiceRepository.UpdateAsync(invoice);

        return Ok();
    }

    /// <summary>
    /// Owner || Manager update who paid invoice
    /// </summary>
    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPut("{id}/paid/{tenantId}")]
    public async Task<IActionResult> PaidInvoiceAsync([FromRoute] Guid id, [FromRoute] Guid tenantId)
    {
        var invoice = await _invoiceRepository.FindByIdAsync(id);
        if (invoice == null) throw new NotFoundException($"Invoice not found");

        var roomId = invoice.RoomId;
        var hasPermission = await _authorServices.IsRoomManageByCurrentUser(roomId, CurrentUserID);
        if (!hasPermission) throw new ForbiddenException($"User is not the owner or manager of the room");

        var canModify = await _invoiceService.CanModifyAsync(invoice);
        if (!canModify) throw new BadRequestException($"The invoice has been paid");

        var tenant = await _userRepository.FindByIdAsync(tenantId);
        if (tenant == null) throw new NotFoundException($"Tenant not found");

        var hasTenant = await _roomService.HasTenant(roomId, tenantId);
        if (!hasTenant) throw new BadRequestException($"Tenant is not a member of the room");

        invoice.TenantPaidId = tenantId;
        await _invoiceRepository.UpdateAsync(invoice);

        return Ok();
    }


    [HttpPost("create-vnpay")]
    // [Authorize(Roles = nameof(Role.Tenant))]
    public async Task<IActionResult> CreateVnPayBill(Guid invoiceId)
    {
        var invoice = await _invoiceRepository.FindByIdAsync(invoiceId);
        if (invoice == null) throw new NotFoundException($"Invoice not found");
        string result = _paymentService.CreatePaymentFromInvoice(invoice);
        return Ok(result);
    }

    [HttpGet("callback-vnpay")]
    // [Authorize(Roles = nameof(Role.Tenant))]
    public async Task<IActionResult> CallbackVnPay()
    {
        var queryDictionary = QueryHelpers.ParseQuery(Request.QueryString.Value);
        await _paymentService.ProcessCallback(queryDictionary, CurrentUserID);
        string url = QueryHelpers.AddQueryString(_appSettings.VnPayConfig.FrontendCallBack, queryDictionary);
        return Redirect(url);
    }
}
