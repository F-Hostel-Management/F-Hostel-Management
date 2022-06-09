using Domain.Common;
using Domain.Entities.Room;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.User;

public class RoomTenant : BaseEntity
{
    // M tenants - M rooms
    [Column(Order = 1)]
    public Guid RoomId { get; set; }
    public RoomEntity Room { get; set; }

    [Column(Order = 2)]
    public Guid TenantId { get; set; }
    public UserEntity Tenant { get; set; }
}
