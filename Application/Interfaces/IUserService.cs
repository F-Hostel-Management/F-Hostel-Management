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
        Task UpdateProfile(UserEntity updatingEntity);
        Task<string> UploadAvatar(string userID, IFormFile formFile);
    }
}
