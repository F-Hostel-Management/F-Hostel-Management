namespace Api.UserFeatures.Responses
{
    public class LoginResponse
    {
        public bool IsFirstTime { get; set; }
        public string Token { get; set; }
    }
}
