using Api.UserFeatures.Requests;
using Api.UserFeatures.Responses;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;

namespace Api.Controllers.Rest
{
    [Authorize]
    public class UsersController:BaseRestController
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }



        [HttpPost("update-user")]
        public async Task<IActionResult> UpdateUser([FromForm] UpdateUserProfileRequest updateUserProfileRequest)
        {
            //var userID = GetUserID();
            //var avatarUrl = await _userService.UploadAvatar(userID.ToString(), updateUserProfileRequest.IdentificationImage);    
            //UpdateProfileResponse response = new UpdateProfileResponse();
            //response.AvatarUrl = avatarUrl;
            return Ok();
        }

       
    }
}
