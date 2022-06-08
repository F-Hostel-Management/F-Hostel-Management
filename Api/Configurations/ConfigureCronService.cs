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

            q.ScheduleJob<InvoiceScheduleJob>(trigger => trigger
                                                 .WithIdentity("Invoice schedule trigger")
                                                 .WithCronSchedule(appSettings.Value.Cron));
        });
        services.AddQuartzHostedService();
        services.AddScoped<InvoiceScheduleJob>();
    }
}
