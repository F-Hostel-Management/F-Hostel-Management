

using Api.UserFeatures.Requests;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Constants;
using Domain.Entities.InvoiceSchedule;
using Domain.Entities.Room;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest;

public class InvoiceSchedulesController : BaseRestController
{
    private readonly IGenericRepository<InvoiceScheduleEntity> _invoiceScheduleRepository;
    private readonly IAuthorizationServices _authorizationService;
    private readonly IGenericRepository<RoomEntity> _roomRepository;

    public InvoiceSchedulesController(IGenericRepository<InvoiceScheduleEntity> invoiceScheduleRepository, IAuthorizationServices authorizationService, IGenericRepository<RoomEntity> roomRepository)
    {
        _invoiceScheduleRepository = invoiceScheduleRepository;
        _authorizationService = authorizationService;
        _roomRepository = roomRepository;
    }

    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPost("{roomId}")]
    public async Task<IActionResult> CreateInvoiceScheduleAsync(Guid roomId, CreateInvoiceScheduleRequest request)
    {
        var room = await _roomRepository.FindByIdAsync(roomId);
        if (room == null) throw new NotFoundException($"Room not found");

        var hasPermission = await _authorizationService.IsRoomManageByCurrentUser(roomId, CurrentUserID);
        if (!hasPermission) throw new ForbiddenException($"User is not the owner or manager of the room");

        var invoice = Mapper.Map<InvoiceScheduleEntity>(request);
        invoice.RoomId = roomId;
        invoice.ManagerId = CurrentUserID;
        await _invoiceScheduleRepository.CreateAsync(invoice);

        return Ok();
    }

    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateInvoiceScheduleAsync(Guid id, UpdateInvoiceScheduleRequest request)
    {
        var invoice = await _invoiceScheduleRepository.FindByIdAsync(id);
        if (invoice == null) throw new NotFoundException($"Invoice not found");

        var roomId = invoice.RoomId;
        var hasPermission = await _authorizationService.IsRoomManageByCurrentUser(roomId, CurrentUserID);
        if (!hasPermission) throw new ForbiddenException($"User is not the owner or manager of the room");

        Mapper.Map(request, invoice);
        await _invoiceScheduleRepository.UpdateAsync(invoice);

        return Ok();
    }
}
