using Api.App.Configurations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Api.Configurations
{
    public static class ConfigureJwtService
    {
        public static IServiceCollection AddJwtService(this IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                    {
                        var appSettings = services.BuildServiceProvider().GetService<IOptions<AppSettings>>();
                        var firebase = appSettings.Value.Firebase;
                        options.Authority = appSettings.Value.Firebase.ValidIssuer;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            ValidIssuer = firebase.ValidIssuer,
                            ValidAudience = firebase.ValidAudience
                        };
                    });
            return services;
        }
    }
}
