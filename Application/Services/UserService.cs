using Application.Interfaces;
using Application.Interfaces.IRepository;
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
        private readonly IGenericRepository<UserEntity> _userRepository;

        public UserService(ICloudStorage cloudStorage, IGenericRepository<UserEntity> userRepository)
        {
            _cloudStorage = cloudStorage;
            _userRepository = userRepository;
        }

        public Task UpdateProfileAsync(UserEntity updatingEntity)
        {
            throw new NotImplementedException();
        }

        public async Task<string> UploadAvatarAsync(UserEntity userEntity, IFormFile formFile)
        {
            string fileNameForStorage = FormFileName("A_" + userEntity.Id.ToString(), formFile.FileName);
            var uploadedUrl = await _cloudStorage.UploadFileAsync(formFile, fileNameForStorage);
            return uploadedUrl;
        }
        private static string FormFileName(string title, string fileName)
        {
            var fileExtension = Path.GetExtension(fileName);
            var fileNameForStorage = $"{title}-{DateTime.Now.ToString("yyyyMMddHHmmss")}{fileExtension}";
            return fileNameForStorage;
        }

        public async Task<UserEntity> SignUpUserAsync(UserEntity userEntity)
        {
            await _userRepository.CreateAsync(userEntity);
            return userEntity;  
        }

        public async Task<IList<string>> UploadIdentification(UserEntity userEntity, IList<IFormFile> formFile)
        {
            List<string> result = new List<string>();
            for (int i = 0; i < formFile.Count; i++)
            {
                string fileNameForStorage = FormFileName($"ID{i}_" + userEntity.Id.ToString(), formFile[i].FileName);
                var uploadedUrl = await _cloudStorage.UploadFileAsync(formFile[i], fileNameForStorage);
                result.Add(uploadedUrl);
            }
                
            return result;
        }
    }
}
