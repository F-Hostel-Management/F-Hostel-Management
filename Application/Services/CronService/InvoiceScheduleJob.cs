using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Utilities;
using Domain.Entities.Invoice;
using Domain.Entities.InvoiceSchedule;
using Quartz;

namespace Application.Services.CronService;

public class InvoiceScheduleJob : IJob
{
    private readonly IGenericRepository<InvoiceEntity> _invoiceRepository;
    private readonly IGenericRepository<InvoiceScheduleEntity> _invoiceScheduleRepository;
    private readonly IInvoiceService _invoiceService;
    private readonly IMailService _mailService;

    public InvoiceScheduleJob(IGenericRepository<InvoiceEntity> invoiceRepository, IGenericRepository<InvoiceScheduleEntity> invoiceScheduleRepository, IInvoiceService invoiceService)
    {
        _invoiceRepository = invoiceRepository;
        _invoiceScheduleRepository = invoiceScheduleRepository;
        _invoiceService = invoiceService;
    }

    public async Task Execute(IJobExecutionContext context)
    {
        var invoiceSchedules = await _invoiceScheduleRepository.WhereAsync(invoice => invoice.Cron != null);

        foreach (var invoiceSchedule in invoiceSchedules)
        {
            await CreateInvoice(invoiceSchedule);
        }
    }

    private async Task CreateInvoice(InvoiceScheduleEntity invoice)
    {
        var now = DateTime.Now;
        var dueDate = DateTime.Now;

        if (invoice.Cron.Equals("Month") && now.Day.Equals(invoice.CreateDate))
        {
            dueDate = dueDate.AddDays(invoice.PaymentDate);
        }
        else if (invoice.Cron.Equals("Week") && now.DayOfWeek.Equals((DayOfWeek) invoice.CreateDate))
        {
            dueDate = dueDate.AddDays(invoice.PaymentDate);
        }
        else return;


        try
        {
            var newInvoice = new InvoiceEntity()
            {
                InvoiceCode = CodeGeneratorUtil.genarateByNowDateTime(),
                Content = invoice.Content,
                Date = now,
                DueDate = dueDate,
                Quantity = 1,
                UnitPrice = invoice.Price,
                Price = invoice.Price,
                InvoiceType = invoice.InvoiceType,
                ManagerId = invoice.ManagerId,
                RoomId = invoice.RoomId,
                TenantPaid = null,
            };

            await _invoiceRepository.CreateAsync(newInvoice);
            await _invoiceService.SendNotifyInvoice(newInvoice.Id);
        }
        catch { }
    }
}
