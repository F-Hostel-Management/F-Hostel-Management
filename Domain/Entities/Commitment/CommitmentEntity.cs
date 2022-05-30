using Domain.Common;
using Domain.Entities.Room;
using System.ComponentModel.DataAnnotations.Schema;


namespace Domain.Entities.Commitment;
[Table("Commitments")]
public class CommitmentEntity : BaseEntity
{
    public string CommitmentCode { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Content { get; set; }

    /*navigation props*/

    // 1 Commitment (belong to) M Managers
    public Guid? ManagerId { get; set; }
    public UserEntity Manager { get; set; }

    // 1 tenants M commitment
    public Guid TenantId { get; set; }
    public UserEntity Tenant { get; set; }

    // 1 Owner M commitment
    public Guid OwnerId { get; set; }
    public UserEntity Owner { get; set; }

    // 1 Commitment (belong to) 1 Rooms
    public Guid RoomId { get; set; }
    public RoomEntity Room { get; set; }
}
