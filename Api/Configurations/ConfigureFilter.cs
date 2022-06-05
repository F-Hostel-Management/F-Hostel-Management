using Api.Filters;

namespace Api.Configurations;

public static class ConfigureFilter
{
    public static void AddFilters(this IServiceCollection services)
    {
        services.AddScoped<ValidateManagementFilter>();
    }
}
