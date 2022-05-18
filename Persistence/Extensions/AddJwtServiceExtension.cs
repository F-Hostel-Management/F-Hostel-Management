using Infrastructure.Configurations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Extensions
{
    public static class AddJwtServiceExtension
    {
        public static IServiceCollection AddJwtService(this IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                    {
                        var appSettings = services.BuildServiceProvider().GetService<IOptions<AppSettings>>();
                        var jwtSetting = appSettings.Value.JwtSetting;
                        options.RequireHttpsMetadata = false;
                        options.SaveToken = true;
                        options.TokenValidationParameters = new TokenValidationParameters()
                        {
                            ValidateIssuerSigningKey = jwtSetting.ValidateIssuerSigningKey,
                            IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(jwtSetting.IssuerSigningKey)),
                            ValidateIssuer = jwtSetting.ValidateIssuer,
                            ValidIssuer = jwtSetting.ValidIssuer,
                            ValidateAudience = jwtSetting.ValidateAudience,
                            ValidAudience = jwtSetting.ValidAudience,
                            RequireExpirationTime = jwtSetting.RequireExpirationTime,
                            ValidateLifetime = jwtSetting.RequireExpirationTime,
                            ClockSkew = TimeSpan.FromDays(1),
                        };
                    });
            return services;
        }
    }
}
