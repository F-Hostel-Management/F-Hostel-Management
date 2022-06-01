using Api.UserFeatures.CustomValidationAttributes;

namespace Api.UserFeatures.Requests
{
    public class UploadAvatarUserRequest
    {
        ////[Display(Name = "Image File")]
        [MaxFileSize(1024 * 1024 * 5)]
        public virtual IFormFile Avatar { get; set; }
    }
}
