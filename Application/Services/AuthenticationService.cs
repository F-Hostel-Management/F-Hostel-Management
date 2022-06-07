using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using AutoWrapper.Wrappers;
using Domain.Entities;
using Domain.Enums;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Http;

namespace Application.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IGenericRepository<UserEntity> _userRepository;
        private readonly ITokenService _tokenService;

        public AuthenticationService(IGenericRepository<UserEntity> userRepository, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        //public async Task<UserEntity> ExchangeTokenAsync(string token, Role loginType)
        //{
        //    FirebaseToken firebaseToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
        //    var email = firebaseToken.Claims.GetValueOrDefault("email");
        //    var name = firebaseToken.Claims.GetValueOrDefault("name");
        //    UserEntity userEntity = await _userRepository.FirstOrDefaultAsync(a => a.Email.Equals(email));
        //    if (userEntity is null)
        //    {
        //         userEntity = await SignUpNewUser(email.ToString(), name.ToString(), loginType);
        //    }
        //    return userEntity;
        //}


        public string GenerateToken(UserEntity user)
        {
            return _tokenService.GetToken(user);
        }

        public async Task<FirebaseToken> GetFirebaseTokenAsync(string token)
        {
            return await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
        }

        public async Task<UserEntity> GetUserByFirebaseTokenAsync(string token)
        {
            FirebaseToken firebaseToken = await GetFirebaseTokenAsync(token);
            var email = firebaseToken.Claims.GetValueOrDefault("email");
            var name = firebaseToken.Claims.GetValueOrDefault("name");
            if (email is null)
            {
                throw new BadRequestException($"This account cannot use to log-in, please try another account!");
            }
            UserEntity userEntity = await _userRepository.FirstOrDefaultAsync(a => a.Email.Equals(email));
            return userEntity;
        }

        //public async Task<UserEntity> SignUpNewUserAsync(string email, string name, Role role)
        //{
        //    UserEntity userEntity = new UserEntity();
        //    userEntity.Email = email;
        //    userEntity.Role = role;
        //    userEntity.Name = name;
        //    await _userRepository.CreateAsync(userEntity);
        //    return userEntity;
        //}
    }
}
