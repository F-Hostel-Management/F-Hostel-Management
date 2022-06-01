using Api.Mappings;
using Domain.Entities;
using Domain.Enums;

namespace Api.UserFeatures.Responses
{
    public class GetInfoResponse : IMapFrom<UserEntity>
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string RoleString { get; set; }
        public string Avatar { get; set; }
        public string Identification { get; set; }
    }
}
