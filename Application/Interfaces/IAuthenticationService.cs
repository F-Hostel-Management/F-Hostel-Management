using Domain.Entities;
using Domain.Enums;
using FirebaseAdmin.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
