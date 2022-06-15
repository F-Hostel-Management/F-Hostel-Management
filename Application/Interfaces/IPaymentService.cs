using System.Collections.Specialized;
using Domain.Entities.Invoice;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

namespace Application.Interfaces;

public interface IPaymentService
{
    string CreatePaymentFromInvoice(InvoiceEntity invoiceEntity, string origin);
    Task ProcessCallback(Dictionary<string, StringValues> queryString, Guid tenantPaid);
}