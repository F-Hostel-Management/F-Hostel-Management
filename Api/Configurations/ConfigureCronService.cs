using Application.AppConfig;
using Application.Services.CronService;
using Microsoft.Extensions.Options;
using Quartz;

namespace Api.Configurations;

public static class ConfigureCronService
{
    public static void AddCronService(this IServiceCollection services)
    {
        var appSettings = services.BuildServiceProvider().GetService<IOptions<AppSettings>>();

        services.AddQuartz(q =>
        {
            q.UseMicrosoftDependencyInjectionJobFactory();

            q.UseSimpleTypeLoader();
            q.UseInMemoryStore();

            q.AddJob<InvoiceScheduleJob>(CronJobKeys.InvoiceSchedule);
            q.AddTrigger(trigger => trigger
                                    .ForJob(CronJobKeys.InvoiceSchedule)
                                    .WithCronSchedule(appSettings.Value.Cron));

            q.AddJob<CommitmentJob>(CronJobKeys.CommitmentSchedule);
            q.AddTrigger(trigger => trigger
                                    .ForJob(CronJobKeys.CommitmentSchedule)
                                    .WithCronSchedule(appSettings.Value.Cron));

            q.AddJob<JoiningCodeJob>(CronJobKeys.JoiningCodeSchedule);
            q.AddTrigger(trigger => trigger
                                    .ForJob(CronJobKeys.JoiningCodeSchedule)
                                    .WithCronSchedule(appSettings.Value.Cron));
        });
        services.AddQuartzHostedService();
        services.AddScoped<InvoiceScheduleJob>();
        services.AddScoped<CommitmentJob>();
        services.AddScoped<JoiningCodeJob>();
    }
}
