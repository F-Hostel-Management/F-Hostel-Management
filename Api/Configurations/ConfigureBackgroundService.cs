using System.Configuration;
using Application.AppConfig;
using Hangfire;
using Hangfire.SqlServer;
using Microsoft.Extensions.Options;

namespace Api.Configurations;

public static class ConfigureBackgroundService
{
    public static void AddBackgroundService(this IServiceCollection services)
    {
        var settings = services.BuildServiceProvider().GetService<IOptions<AppSettings>>();
        services.AddHangfire(configuration => configuration
            .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
            .UseSimpleAssemblyNameTypeSerializer()
            .UseRecommendedSerializerSettings()
            .UseSqlServerStorage(settings.Value.ConnectionStrings.DefaultConnection, new SqlServerStorageOptions
            {
                CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
                SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
                QueuePollInterval = TimeSpan.Zero,
                UseRecommendedIsolationLevel = true,
                DisableGlobalLocks = true
            }));
        services.AddHangfireServer();
    }
}