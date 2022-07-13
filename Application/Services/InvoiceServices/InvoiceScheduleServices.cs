using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Entities.InvoiceSchedule;

namespace Application.Services.InvoiceScheduleServices;
public class InvoiceScheduleServices : IInvoiceScheduleServices
{
    private readonly IGenericRepository<InvoiceScheduleEntity> _invoiceScheduleRepository;
    public InvoiceScheduleServices(IGenericRepository<InvoiceScheduleEntity> invoiceScheduleRepository)
    {
        _invoiceScheduleRepository = invoiceScheduleRepository;
    }
    public async Task DeleteInvoicesScheduleByRoomId(Guid roomId)
    {
        var entities = await _invoiceScheduleRepository.WhereAsync(invoice => invoice.RoomId.Equals(roomId));
        await _invoiceScheduleRepository.DeleteRangeAsync(entities);
    }
}
