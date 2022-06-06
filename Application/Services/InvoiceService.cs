using Application.Interfaces;
using Domain.Entities.Invoice;

namespace Application.Services;

public class InvoiceService : IInvoiceService
{
    public async Task<bool> CanDelete(InvoiceEntity invoice)
    {
        if (invoice.TenantPaid != null) return false;
        return true;
    }
}
