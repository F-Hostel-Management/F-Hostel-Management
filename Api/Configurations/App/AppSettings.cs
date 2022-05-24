


namespace Api.App.Configurations
{
    public class AppSettings
    {
        public DbConfig ConnectionStrings { get; set; }
        public JwtSetting JwtSetting { get; set; }
        public string SpaDevServer { get; set; }
        public string FirebaseConfigPath { get; set; }
    }
}
