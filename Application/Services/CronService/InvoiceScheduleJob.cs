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

    public InvoiceScheduleJob(IGenericRepository<InvoiceEntity> invoiceRepository, IGenericRepository<InvoiceScheduleEntity> invoiceScheduleRepository)
    {
        _invoiceRepository = invoiceRepository;
        _invoiceScheduleRepository = invoiceScheduleRepository;
    }

    public async Task Execute(IJobExecutionContext context)
    {
        var now = DateTime.Now;
        var invoiceSchedules = await _invoiceScheduleRepository.WhereAsync(invoice => invoice.Cron != null);

        foreach (var invoiceSchedule in invoiceSchedules)
        {
            await DoCreateInvoiceJob(now, invoiceSchedule);
        }
    }

    private static int IsDayInMonth(InvoiceScheduleEntity invoice)
    {
        int day = -1;
        try
        {
            day = Int32.Parse(invoice.Cron);
        }
        catch { }

        return day;
    }

    private async Task DoCreateInvoiceJob(DateTime date, InvoiceScheduleEntity invoice)
    {
        int day = IsDayInMonth(invoice);
        if (day == -1) // day of week
        {
            if (date.DayOfWeek.ToString().ToUpper() != invoice.Cron.ToUpper()) return;
            await CreateInvoice(invoice);
        }
        else if (1 <= day && day <= 31) // day of month
        {
            if (date.Day.ToString() != invoice.Cron) return;
            await CreateInvoice(invoice);
        }
    }

    private async Task CreateInvoice(InvoiceScheduleEntity invoice)
    {
        try
        {
            var newInvoice = new InvoiceEntity()
            {
                InvoiceCode = CodeGeneratorUtil.genarateByNowDateTime(),
                Content = invoice.Content,
                Date = DateTime.Now,
                Price = invoice.Price,
                InvoiceType = invoice.InvoiceType,
                ManagerId = invoice.ManagerId,
                RoomId = invoice.RoomId,
                TenantPaid = null,
            };

            await _invoiceRepository.CreateAsync(newInvoice);
        }
        catch { }
    }
}
