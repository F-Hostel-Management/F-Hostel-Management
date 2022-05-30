using Api.Mappings;
using Domain.Entities;
using Domain.Entities.Room;
using Domain.Enums;

namespace Api.UserFeatures.Responses;

public class ODataDemo : IMapFrom<UserEntity>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public Role Role { get; set; }

    public Guid RoomId { get; set; }
    public RoomEntity Room { get; set; }
}
