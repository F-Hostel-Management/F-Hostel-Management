using Api.UserFeatures.Requests;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Utilities;
using AutoWrapper.Wrappers;
using Domain.Constants;
using Domain.Entities.Invoice;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest;

public class InvoicesController : BaseRestController
{
    private readonly IGenericRepository<InvoiceEntity> _invoiceRepository;
    private readonly IRoomServices _roomService;

    public InvoicesController(IGenericRepository<InvoiceEntity> invoiceRepository, IRoomServices roomService)
    {
        _invoiceRepository = invoiceRepository;
        _roomService = roomService;
    }

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
}
