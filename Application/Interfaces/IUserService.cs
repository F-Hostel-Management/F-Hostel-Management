using Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task UpdateProfileAsync(UserEntity updatingEntity);
        Task<string> UploadAvatarAsync(UserEntity userEntity, IFormFile formFile);
        Task<IList<string>> UploadIdentification(UserEntity userEntity, IList<IFormFile> formFile);
        Task<UserEntity> SignUpUserAsync(UserEntity userEntity);
    }
}
