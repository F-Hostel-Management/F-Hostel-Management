using Application.Models;
using Domain.Entities.Invoice;

namespace Application.Interfaces;

public interface IInvoiceService
{
    Task<bool> CanModifyAsync(InvoiceEntity invoice);

    Task<IList<MailRequest>> CreateNotifyInvoiceMails(Guid invoiceId);

    Task SendNotifyInvoice(Guid invoiceId);
}
