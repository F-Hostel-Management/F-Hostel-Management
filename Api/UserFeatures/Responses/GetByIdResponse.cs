using Api.Mappings;
using Domain.Entities;
using Domain.Enums;

namespace Api.UserFeatures.Responses;

public class GetByIdResponse : IMapFrom<UserEntity>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public Role Role { get; set; }
}
