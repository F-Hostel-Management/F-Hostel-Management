using Application.AppConfig;
using Application.Interfaces;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Application.Services
{
    public class GoogleCloudStorageService : ICloudStorage
    {
        private GoogleCredential googleCredential;
        private StorageClient storageClient;
        private string bucketName;
        private const string FIREBASE_STORAGE = "https://firebasestorage.googleapis.com/v0/b";


        private readonly AppSettings appSetting;

        public GoogleCloudStorageService(IOptions<AppSettings> appSetting)
        {
            this.appSetting = appSetting.Value;
            var configuration = appSetting.Value;
            googleCredential = GoogleCredential.FromFile(configuration.FirebaseConfigPath);
            storageClient = StorageClient.Create(googleCredential);
            bucketName = configuration.GoogleCloudStorageBucket;
        }

        public async Task DeleteFileAsync(string fileNameForStorage)
        {
            try
            {
                await storageClient.DeleteObjectAsync(bucketName, fileNameForStorage);
            }
            catch (Exception)
            {
            }
        }

        private string ConvertCloudStorageUrlToFirebase(string fileName)
        {
            return $"{FIREBASE_STORAGE}/{appSetting.GoogleCloudStorageBucket}/o/{fileName}";
        }
        public async Task<string> UploadFileAsync(IFormFile imageFile, string fileNameForStorage)
        {
            using (var memoryStream = new MemoryStream())
            {
                await imageFile.CopyToAsync(memoryStream);
                var dataObject = await storageClient.UploadObjectAsync(bucketName, fileNameForStorage, imageFile.ContentType, memoryStream);
                return ConvertCloudStorageUrlToFirebase(fileNameForStorage);
            }
        }
    }
}
