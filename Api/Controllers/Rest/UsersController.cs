using Api.UserFeatures.Requests;
using Api.UserFeatures.Responses;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest
{
    [Authorize]
    public class UsersController : BaseRestController
    {
        private readonly IUserService _userService;
        private readonly IGenericRepository<UserEntity> _userRepository;

        public UsersController(IUserService userService, IGenericRepository<UserEntity> userRepository)
        {
            _userService = userService;
            _userRepository = userRepository;
        }


        [HttpPost("upload-avatar")]
        public async Task<IActionResult> UploadAvatar([FromForm] UploadAvatarUserRequest uploadAvatarUserRequest)
        {
            var user = await _userRepository.FirstOrDefaultAsync(e => e.Id.Equals(CurrentUserID));
            var avatarUrl = await _userService.UploadAvatarAsync(user, uploadAvatarUserRequest.Avatar);
            user.Avatar = avatarUrl;
            await _userRepository.UpdateAsync(user);
            return Ok(user.Avatar);
        }

        [HttpPost("upload-identification-card")]
        public async Task<IActionResult> UploadIdentificationCard([FromForm] UploadIdentificationUserRequest uploadIdentificationUserRequest)
        {
            var user = await _userRepository.FirstOrDefaultAsync(e => e.Id.Equals(CurrentUserID));
            var listImage = new List<IFormFile>();
            listImage.Add(uploadIdentificationUserRequest.FrontIdentification);
            listImage.Add(uploadIdentificationUserRequest.BackIdentification);
            var listResult = await _userService.UploadIdentification(user, listImage);
            user.FrontIdentification = listResult[0];
            user.BackIdentification = listResult[1];
            await _userRepository.UpdateAsync(user);
            return Ok(listResult);
        }

        [HttpPatch("update-user")]
        public async Task<IActionResult> UpdateUser(UpdateUserProfileRequest updateUserProfileRequest)
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
