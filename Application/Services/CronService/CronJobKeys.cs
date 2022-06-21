using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.CronService;

public static class CronJobKeys
{
    public static JobKey InvoiceSchedule { get => new JobKey("InvoiceScheduleJob"); }
}
