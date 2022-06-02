using Api.UserFeatures.CustomValidationAttributes;
using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests
{
    public class UploadIdentificationUserRequest
    {
        [Required]
        [MaxFileSize(1024 * 1024 * 2)]
        public virtual IFormFile FrontIdentification { get; set; }
        [Required]
        [MaxFileSize(1024 * 1024 * 2)]
        public virtual IFormFile BackIdentification { get; set; }
    }
}
