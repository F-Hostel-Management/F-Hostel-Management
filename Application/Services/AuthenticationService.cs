using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Entities;
using Domain.Enums;
using FirebaseAdmin.Auth;


namespace Application.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private IGenericRepository<UserEntity> _userRepository;

        public AuthenticationService(IGenericRepository<UserEntity> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> AuthenticateUser(string token, Role loginType)
        {
            FirebaseToken firebaseToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
            var email = firebaseToken.Claims.GetValueOrDefault("email");
            var currentUser = _userRepository.WhereAsync(a => a.Email.Equals(email));
            UserEntity userEntity = null;
            if (currentUser == null)
            {
                 userEntity = await SignUpNewUser(email.ToString(), loginType);
            }
            return true;
        }

        public Task<string> GenerateToken(UserEntity user)
        {
            throw new NotImplementedException();
        }

        public Task<UserEntity> SignUpNewUser(string email, Role role)
        {
            throw new NotImplementedException();
        }
    }
}
