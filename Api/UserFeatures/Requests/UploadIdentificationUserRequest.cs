using Api.UserFeatures.CustomValidationAttributes;

namespace Api.UserFeatures.Requests
{
    public class UploadIdentificationUserRequest
    {
        [MaxFileSize(1024 * 1024 * 2)]
        public virtual IFormFile FrontIdentification { get; set; }

        [MaxFileSize(1024 * 1024 * 2)]
        public virtual IFormFile BackIdentification { get; set; }
    }
}
