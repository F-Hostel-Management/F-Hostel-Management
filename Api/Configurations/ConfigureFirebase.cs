using Api.App.Configurations;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.Extensions.Options;

namespace Api.Configurations
{
    public static class ConfigureFirebase
    {
        public static void AddFirebase(this IServiceCollection services)
        {
            var appSettings = services.BuildServiceProvider().GetService<IOptions<AppSettings>>();
            FirebaseApp.Create(new AppOptions
            {
                Credential = GoogleCredential.FromFile(appSettings.Value.FirebaseConfigPath)
            });
        }
    }
}
