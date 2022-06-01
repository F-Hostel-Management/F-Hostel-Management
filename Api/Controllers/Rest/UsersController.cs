using Api.UserFeatures.Requests;
using Api.UserFeatures.Responses;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using AutoWrapper.Wrappers;
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
        private readonly IGenericRepository<UserEntity> _userRepository;

        public UsersController(IUserService userService, IGenericRepository<UserEntity> userRepository)
        {
            _userService = userService;
            _userRepository = userRepository;
        }


        [HttpPost("upload-avatar")]
        public async Task<IActionResult> UploadAvatar([FromBody] UploadAvatarUserRequest uploadAvatarUserRequest)
        {
            var user = await _userRepository.FirstOrDefaultAsync(e => e.Id.Equals(CurrentUserID));
            var avatarUrl = await _userService.UploadAvatarAsync(user, uploadAvatarUserRequest.Avatar);
            user.Avatar = avatarUrl;
            await _userRepository.UpdateAsync(user);
            return Ok(user.Avatar);
        }

        [HttpPost("upload-identification-card")]
        public async Task<IActionResult> UpLoadIdentificationCard([FromBody] UploadIdentificationUserRequest uploadIdentificationUserRequest)
        {
            var user = await _userRepository.FirstOrDefaultAsync(e => e.Id.Equals(CurrentUserID));
            var identificationUrl = await _userService.UploadIdentification(user, uploadIdentificationUserRequest.Identification);
            user.Identification = identificationUrl;
            await _userRepository.UpdateAsync(user);
            return Ok(user.Identification);
        }

        [HttpPatch("update-user")]
        public async Task<IActionResult> UpdateUser([FromForm] UpdateUserProfileRequest updateUserProfileRequest)
        {
            var userID = GetUserID();
            var user = await _userRepository.FirstOrDefaultAsync(e => e.Id.Equals(userID));   
            Mapper.Map(updateUserProfileRequest, user);
            await _userRepository.UpdateAsync(user);
            return Ok();
        }

        [HttpGet("info")]
        public async Task<IActionResult> GetCurrentInfo()
        {
            var user = await _userRepository.FirstOrDefaultAsync(e => e.Id.Equals(CurrentUserID));
            GetInfoResponse getInfoResponse = new();
            Mapper.Map(user, getInfoResponse);
            return Ok(getInfoResponse);
        }


    }
}
