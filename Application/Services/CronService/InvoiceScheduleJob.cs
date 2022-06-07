using Quartz;

namespace Application.Services.CronService;

public class InvoiceScheduleJob : IJob
{ 
    public async Task Execute(IJobExecutionContext context)
    {
        Console.WriteLine("Job is running");
    }
}
