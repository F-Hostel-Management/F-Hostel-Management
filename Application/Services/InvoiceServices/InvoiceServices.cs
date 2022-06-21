using Application.Interfaces;
using Domain.Entities.Invoice;

namespace Application.Services;

public class InvoiceServices : IInvoiceService
{
    public async Task<bool> CanModifyAsync(InvoiceEntity invoice)
    {
        if (invoice.TenantPaid != null) return false;
        return true;
    }
}
