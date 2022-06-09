using Api.Mappings;
using Api.UserFeatures.Attributes;
using Domain.Entities;
using Domain.Enums;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests
{
    public class UpdateUserProfileRequest:IMapTo<UserEntity>
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string CitizenIdentity { get; set; }
        public string Phone { get; set; }
        public string TaxCode { get; set; }
        public Gender Gender { get; set; }
        public DateTime DateOfBirth { get; set; }

        ////[Display(Name = "Image File")]
        //[MaxFileSize(1024 * 1024 * 5)]
        //public virtual IFormFile Avatar { get; set; }
    }
}
