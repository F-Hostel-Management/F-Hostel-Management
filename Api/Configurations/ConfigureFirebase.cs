using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;

namespace Api.Configurations
{
    public static class ConfigureFirebase
    {
        public static void AddFirebase(this IServiceCollection services)
        {
            FirebaseApp.Create(new AppOptions
            {
                Credential = GoogleCredential.FromFile(@"D:\Projects\F-Hostel-Management\Api\f-hostel-5dac2-firebase-adminsdk-v6isl-a9a2705925.json")
            }); ;
        }
    }
}
