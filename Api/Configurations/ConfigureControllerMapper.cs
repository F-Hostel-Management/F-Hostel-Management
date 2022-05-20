using Api.App.Configurations;
using Microsoft.Extensions.Options;

namespace Api.Configurations
{
    public static class ConfigureControllerMapper
    {
        private static void AddMappingSpa(this WebApplication app)
        {
            var spaDevServer = app.Services.GetService<IOptions<AppSettings>>().Value.SpaDevServer;
            app.MapWhen(ctx => !ctx.Request.Path.StartsWithSegments("/api"), config =>
            {
                if (app.Environment.IsDevelopment())
                {
                    config.UseSpa(spa =>
                    {
                        spa.UseProxyToSpaDevelopmentServer(spaDevServer);
                    });
                    return;
                }

                config.UseStaticFiles();
                config.UseEndpoints(endpoints =>
                {
                    endpoints.MapFallbackToFile("index.html");
                });
            });
        }

        private static void AddMappingApi(this WebApplication app)
        {
            app.MapWhen(ctx => ctx.Request.Path.StartsWithSegments("/api"), config =>
            {
                config.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                });
            });
        }

        public static void AddControllerMapper(this WebApplication app)
        {
            app.AddMappingSpa();
            app.AddMappingApi();
        }
    }
}
