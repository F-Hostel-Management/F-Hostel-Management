using Api.Filters;

namespace Api.Configurations;

public static class ConfigureFilters
{
    public static void AddFilters(this IServiceCollection services)
    {
        services.AddScoped<ValidateManagementHostelLevelFilter>();
        services.AddScoped<ValidateManagementByRoomLevelFilter>();
        services.AddScoped<ValidateManagementFilter>();
    }
}
