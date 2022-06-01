using Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task UpdateProfileAsync(UserEntity updatingEntity);
        Task<string> UploadAvatarAsync(UserEntity userEntity, IFormFile formFile);
        Task<string> UploadIdentification(UserEntity userEntity, IFormFile formFile);
        Task<UserEntity> SignUpUserAsync(UserEntity userEntity);
    }
}
