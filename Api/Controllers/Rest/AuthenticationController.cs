using Api.UserFeatures.Requests;
using Api.UserFeatures.Responses;
using Application.Interfaces;
using AutoWrapper.Wrappers;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest
{
    [AllowAnonymous]
    public class AuthenticationController : BaseRestController
    {
        private readonly IAuthenticationService authenticationService;
        private readonly IUserService userService;
        private const string COOKIES_KEY = "f-code";

        public AuthenticationController(IAuthenticationService authenticationService, IUserService userService)
        {
            this.authenticationService = authenticationService;
            this.userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(string firebaseToken)
        {
            var user = await authenticationService.GetUserByFirebaseTokenAsync(firebaseToken);
            LoginResponse loginResponse = new();
            if (user == null)
            {
                loginResponse.IsFirstTime = true;
            }
            else
            {
                loginResponse.IsFirstTime = false;
                loginResponse.Token = authenticationService.GenerateToken(user);
                SetCookie(COOKIES_KEY, loginResponse.Token);
            }
            return Ok(loginResponse);
        }

        [HttpPost("first-time-login")]
        public async Task<IActionResult> FirstTimeLogin([FromBody] FirstTimeRequest loginRequest)
        {
            var user = await authenticationService.GetUserByFirebaseTokenAsync(loginRequest.FirebaseToken);
            if (user is not null)
            {
                return BadRequest("User already exited!");
            }
            var firebaseToken = await authenticationService.GetFirebaseTokenAsync(loginRequest.FirebaseToken);
            var email = firebaseToken.Claims.GetValueOrDefault("email");
            if (email is null)
            {
                throw new ApiException($"This account cannot use to log-in, please try another account!", StatusCodes.Status400BadRequest);
            }
            UserEntity userEntity = new UserEntity();
            userEntity.Email = email.ToString();
            Mapper.Map(loginRequest, userEntity);
            userEntity = await userService.SignUpUserAsync(userEntity);

            LoginResponse loginResponse = new();
            loginResponse.Token = authenticationService.GenerateToken(userEntity);
            loginResponse.IsFirstTime = true;
            SetCookie(COOKIES_KEY, loginResponse.Token);
            return Ok(loginResponse);
        }

        private void SetCookie(string key, string value)
        {
            CookieOptions cookieOptions = new CookieOptions();
            cookieOptions.HttpOnly = true;
            cookieOptions.Expires = DateTime.Now.AddDays(2);
            HttpContext.Response.Cookies.Append(key, value);
        }
    }
}
