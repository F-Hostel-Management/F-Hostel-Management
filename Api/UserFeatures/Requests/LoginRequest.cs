using Domain.Enums;

namespace Api.UserFeatures.Requests
{
    public class LoginRequest
    {
        public string FirebaseToken { get; set; }
        public Role Role; 
    }
}
