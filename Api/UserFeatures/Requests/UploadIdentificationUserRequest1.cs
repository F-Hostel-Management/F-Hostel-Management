using Api.UserFeatures.Attributes;

namespace Api.UserFeatures.Requests
{
    public class UploadIdentificationUserRequest
    {
        ////[Display(Name = "Image File")]
        [MaxFileSize(1024 * 1024 * 5)]
        public virtual IFormFile Identification { get; set; }
    }
}
