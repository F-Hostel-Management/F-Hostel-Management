using Domain.Entities.Invoice;

namespace Application.Interfaces;

public interface IInvoiceService
{
    Task<bool> CanModifyAsync(InvoiceEntity invoice);
}
