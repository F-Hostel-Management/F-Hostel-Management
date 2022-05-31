using Api.UserFeatures.CustomValidationAttributes;
using Domain.Enums;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests
{
    public class UpdateUserProfileRequest
    {
        public string Name { get; set; }
        public Gender Gender { get; set; }
        public string PhoneNumber { get; set; }

        //[Display(Name = "Image File")]
        [MaxFileSize(1024 * 1024 * 5)]
        public virtual IFormFile IdentificationImage { get; set; }
    }
}
