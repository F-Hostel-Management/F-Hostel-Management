using Application.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly ICloudStorage _cloudStorage;

        public UserService(ICloudStorage cloudStorage)
        {
            _cloudStorage = cloudStorage;
        }

        public Task UpdateProfile(UserEntity updatingEntity)
        {
            throw new NotImplementedException();
        }

        public async Task<string> UploadAvatar(string userID, IFormFile formFile)
        {
            string fileNameForStorage = FormFileName(userID.ToString(), formFile.FileName);
            var uploadedUrl = await _cloudStorage.UploadFileAsync(formFile, fileNameForStorage);
            return uploadedUrl;
        }
        private static string FormFileName(string title, string fileName)
        {
            var fileExtension = Path.GetExtension(fileName);
            var fileNameForStorage = $"{title}-{DateTime.Now.ToString("yyyyMMddHHmmss")}{fileExtension}";
            return fileNameForStorage;
        }
    }
}
