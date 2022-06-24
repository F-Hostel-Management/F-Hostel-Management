using Quartz;

namespace Application.Services.CronService;

public static class CronJobKeys
{
    public static JobKey InvoiceSchedule { get => new JobKey("InvoiceScheduleJob"); }
    public static JobKey JoiningCodeSchedule { get => new JobKey("JoiningCodeJob"); }
    public static JobKey CommitmentSchedule { get => new JobKey("CommitmentJob"); }
}
