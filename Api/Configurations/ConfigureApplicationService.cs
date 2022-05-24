using Application.Interfaces;
using Application.Services;

namespace Api.Configurations
{
    public static class ConfigureApplicationService
    {
        public static void AddAppServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationService, AuthenticationService>();
        }
    }
}
