using Domain.Entities;
using FirebaseAdmin.Auth;

namespace Application.Interfaces
{
    public interface IAuthenticationService
    {
        
        //Task<UserEntity> SignUpNewUserAsync(string email, string name, Role role);
        string GenerateToken(UserEntity user);
        Task<UserEntity> GetUserByFirebaseTokenAsync(string token);

        Task<FirebaseToken> GetFirebaseTokenAsync(string token);
    }
}
