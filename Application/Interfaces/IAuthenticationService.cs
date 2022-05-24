using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IAuthenticationService
    {
        Task<UserEntity> AuthenticateUser(string firebaseToken, Role loginType);
        Task<UserEntity> SignUpNewUser(string email, Role role);
        string GenerateToken(UserEntity user);
    }
}
