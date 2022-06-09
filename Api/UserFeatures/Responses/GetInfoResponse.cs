using Api.Mappings;
using Domain.Entities;
using Domain.Enums;

namespace Api.UserFeatures.Responses
{
    public class GetInfoResponse : IMapFrom<UserEntity>
    {
        public Guid Id { get; init; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string CitizenIdentity { get; set; }
        public Gender Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Role Role { get; set; }
        public string Avatar { get; set; }
        public string FrontIdentification { get; set; }
        public string BackIdentification { get; set; }
        public string CardNumber { get; set; }
        public string Address { get; set; }
    }
}
