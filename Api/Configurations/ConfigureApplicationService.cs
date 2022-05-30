using Api.Services;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Services;
using Persistence.Repositories;

namespace Api.Configurations
{
    public static class ConfigureApplicationService
    {
        public static void AddAppServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<ITokenService, JwtBuilderService>();

            //services.AddSingleton<ICloudStorage, GoogleCloudStorage>();
        }
    }
}
