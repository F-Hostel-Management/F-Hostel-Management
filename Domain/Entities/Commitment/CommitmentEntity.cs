using Domain.Common;
using Domain.Entities.Room;
using Domain.Enums;
using Domain.Extensions;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Domain.Entities.Commitment;
[Table("Commitments")]
public class CommitmentEntity : BaseEntity
{
    [Required]
    public string CommitmentCode { get; set; }
    [Required]
    public DateTime CreatedDate { get; set; }
    [Required]
    public DateTime StartDate { get; set; }
    [Required]
    public DateTime EndDate { get; set; }

    public int? DateOverdue { get; set; }

    public double? Compensation { get; set; }

    [Column("Commitment Status")]
    public string Status
    {
        get { return CommitmentStatus.ToString(); }
        private set { CommitmentStatus = value.ParseEnum<CommitmentStatus>(); }
    }

    [NotMapped]
    public CommitmentStatus CommitmentStatus { get; set; }

    //public string Content { get; set; }

    /*navigation props*/

    // 1 scaffolding M commitment
    public Guid? CommitmentScaffoldingId { get; set; }
    public CommitmentScaffolding CommitmentScaffolding { get; set; }

    // 1 Commitment (belong to) M Managers
    public Guid? ManagerId { get; set; }
    public UserEntity Manager { get; set; }

    // 1 tenants M commitment
    public Guid? TenantId { get; set; }
    public UserEntity Tenant { get; set; }

    // 1 Owner M commitment
    [Required]
    public Guid OwnerId { get; set; }
    public UserEntity Owner { get; set; }

    // 1 Commitment (belong to) 1 Rooms
    [Required]
    public Guid RoomId { get; set; }
    public RoomEntity Room { get; set; }

    // 1 com - 1 joining code
    public JoiningCode JoiningCode { get; set; }

    // 1 hostel - m com
    public Guid HostelId { get; set; }
    public HostelEntity Hostel { get; set; }
}
