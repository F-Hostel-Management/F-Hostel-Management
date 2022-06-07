using Api.Services;
using Application.Interfaces;
using Application.Services;
using Application.Services.CommitmentServices;
using Application.Services.HostelServices;
using Application.Services.RoomServices;
using Application.Services.UserServices;

namespace Api.Configurations
{
    public static class ConfigureApplicationService
    {
        public static void AddAppServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<ITokenService, JwtBuilderService>();
            services.AddScoped<IHostelServices, HostelServices>();
            services.AddScoped<ICommitmentServices, CommitmentServices>();
            services.AddScoped<IJoiningCodeServices, JoiningCodeServices>();
            services.AddScoped<IRoomServices, RoomServices>();
            services.AddScoped<ITenantServices, TenantServices>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAuthorizationServices, AuthorizationServices>();
            services.AddSingleton<ICloudStorage, GoogleCloudStorageService>();
        }
    }
}
