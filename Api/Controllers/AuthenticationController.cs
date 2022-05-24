using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Entities;
using Domain.Enums;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthenticationController : BaseApiController
    {
        private IAuthenticationService authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }


        [HttpPost("Authenticate")]
        public async Task<IActionResult> Authenticate(string token, Role loginType)
        {
            var authenticated = await authenticationService.AuthenticateUser(token, loginType);
         
            if (currentUser == null)
            {

            }
            return Ok(email);
        }
    }
}
