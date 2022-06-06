using Api.Mappings;
using Api.UserFeatures.Attributes;
using Domain.Entities;
using Domain.Enums;

namespace Api.UserFeatures.Requests
{
    public class FirstTimeRequest:IMapTo<UserEntity>
    {
        public string FirebaseToken { get; set; }

        public Role Role { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string CardNumber { get; set; }
        public string TaxCode { get; set; }
        public Gender Gender { get; set; }
        public DateTime DateOfBirth { get; set; }

        //public UploadIdentificationUserRequest Identification { get; set; }
        public virtual IFormFile IdentificationImage { get; set; }
    }
}
