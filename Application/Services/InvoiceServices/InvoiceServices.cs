using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Models;
using Domain.Entities.Invoice;

namespace Application.Services;

public class InvoiceServices : IInvoiceService
{
    private readonly IGenericRepository<InvoiceEntity> _invoiceRepo;
    private readonly IMailService _mailService;

    public InvoiceServices(IGenericRepository<InvoiceEntity> invoiceRepo, IMailService mailService)
    {
        _invoiceRepo = invoiceRepo;
        _mailService = mailService;
    }

    public async Task<bool> CanModifyAsync(InvoiceEntity invoice)
    {
        if (invoice.TenantPaid != null) return false;
        return true;
    }

    public async Task<IList<MailRequest>> CreateNotifyInvoiceMails(Guid invoiceId)
    {
        List<MailRequest> listEmail = new List<MailRequest>();
        var invoice = await _invoiceRepo.WhereAsync(e => e.Id.Equals(invoiceId), "Room.RoomTenants.Tenant");
        if (invoice.Count == 0) return new List<MailRequest>();
        foreach (var roomRoomTenant in invoice[0].Room.RoomTenants)
        {
            var mail = new MailRequest();
            mail.Subject = "[F-Hostel] Your bill is due soon, don't forget to pay it!";
            mail.ToEmail =roomRoomTenant.Tenant.Email;
            var body = $"Your bill is due soon, please check out the Bill Page on F-Hostel to see more the details";
            mail.Body = body;
            listEmail.Add(mail);
        }
        return listEmail;
    }

    public async Task SendNotifyInvoice(Guid invoiceId)
    {
        var listEmail = await CreateNotifyInvoiceMails(invoiceId);
        foreach (var email in listEmail)
        {
            _mailService.SendMailSync(email);
        }
    }
}
