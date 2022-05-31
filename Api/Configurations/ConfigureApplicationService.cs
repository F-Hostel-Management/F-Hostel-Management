using Api.Services;
using Application.Interfaces;
using Application.Services;
using Application.Services.CommitmentServices;
using Application.Services.RoomServices;

namespace Api.Configurations
{
    public static class ConfigureApplicationService
    {
        public static void AddAppServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<ITokenService, JwtBuilderService>();
            services.AddScoped<ICommitmentServices, CommitmentServices>();
            services.AddScoped<IRoomServices, RoomServices>();
        }
    }
}
