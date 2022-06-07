using Domain.Entities.Invoice;

namespace Application.Interfaces;

public interface IInvoiceService
{
    Task<bool> CanDelete(InvoiceEntity invoice);
}
