using Api.UserFeatures.Requests;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Utilities;
using AutoWrapper.Wrappers;
using Domain.Constants;
using Domain.Entities;
using Domain.Entities.Invoice;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest;

public class InvoicesController : BaseRestController
{
    private readonly IGenericRepository<InvoiceEntity> _invoiceRepository;
    private readonly IGenericRepository<UserEntity> _userRepository;
    private readonly IRoomServices _roomService;

    public InvoicesController(IGenericRepository<InvoiceEntity> invoiceRepository, IRoomServices roomService, IGenericRepository<UserEntity> userRepository)
    {
        _invoiceRepository = invoiceRepository;
        _roomService = roomService;
        _userRepository = userRepository;
    }

    /// <summary>
    /// Owner || Manager create invoice by room id
    /// </summary>
    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPost("{roomId}")]

    public async Task<IActionResult> CreateAsync([FromRoute] Guid roomId, CreateInvoiceRequest request)
    {
        var hasPermission = await _roomService.RoomManagedBy(roomId, CurrentUserID);
        if (!hasPermission) throw new ApiException($"User is not the owner or manager of the room", StatusCodes.Status403Forbidden);

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
    public async Task<IActionResult> UpdateInvoice([FromRoute] Guid id, UpdateInvoiceRequest request)
    {
        var invoice = await _invoiceRepository.FindByIdAsync(id);
        if (invoice == null) throw new ApiException($"Invoice not found", StatusCodes.Status404NotFound);

        var roomId = invoice.RoomId;
        var hasPermission = await _roomService.RoomManagedBy(roomId, CurrentUserID);
        if (!hasPermission) throw new ApiException($"User is not the owner or manager of the room", StatusCodes.Status403Forbidden);

        if (invoice.TenantPaidId != null) throw new ApiException($"Can not update when the invoice has been paid", StatusCodes.Status400BadRequest);

        Mapper.Map(request, invoice);
        await _invoiceRepository.UpdateAsync(invoice);

        return Ok();
    }

    /// <summary>
    /// Owner || Manager update who paid invoice
    /// </summary>
    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPut("{id}/pay/{tenantId}")]
    public async Task<IActionResult> Pay([FromRoute] Guid id, [FromRoute] Guid tenantId)
    {
        var invoice = await _invoiceRepository.FindByIdAsync(id);
        if (invoice == null) throw new ApiException($"Invoice not found", StatusCodes.Status404NotFound);

        var roomId = invoice.RoomId;
        var hasPermission = await _roomService.RoomManagedBy(roomId, CurrentUserID);
        if (!hasPermission) throw new ApiException($"User is not the owner or manager of the room", StatusCodes.Status403Forbidden);

        if (invoice.TenantPaidId != null) throw new ApiException($"The invoice has been paid", StatusCodes.Status400BadRequest);

        var tenant = await _userRepository.FindByIdAsync(tenantId);
        if (tenant == null) throw new ApiException($"Tenant not found", StatusCodes.Status404NotFound);

        var hasTenant = await _roomService.HasTenant(roomId, tenantId);
        if (!hasTenant) throw new ApiException($"Tenant is not a member of the room", StatusCodes.Status400BadRequest);

        invoice.TenantPaidId = tenantId;
        await _invoiceRepository.UpdateAsync(invoice);

        return Ok();
    }
}
