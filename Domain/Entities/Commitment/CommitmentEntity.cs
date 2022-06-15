using Domain.Common;
using Domain.Entities.Room;
using Domain.Entities.User;
using Domain.Enums;
using Domain.Extensions;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Domain.Entities.Commitment;
[Table("Commitments")]
public class CommitmentEntity : BaseEntity
{
    public string CommitmentCode { get; set; }

    [Required]
    public DateTime CreatedDate { get; set; }
    [Required]
    public DateTime StartDate { get; set; }
    [Required]
    public DateTime EndDate { get; set; }

    public int DateOverdue { get; set; } = 0;

    public double Compensation { get; set; } = 0;

    [Column("Commitment Status")]
    public string Status
    {
        get { return CommitmentStatus.ToString(); }
        private set { CommitmentStatus = value.ParseEnum<CommitmentStatus>(); }
    }

    [NotMapped]
    public CommitmentStatus CommitmentStatus { get; set; }

    [Range(1, 31)]
    public int PaymentDate { get; set; }

    public double Price { get; set; } = 0;

    //public string Content { get; set; }

    // dictionary
    public string OwnerName { get; set; }
    public DateTime OwnerDateOfBirth { get; set; }
    public string OwnerCitizenIdentity { get; set; }
    public string OwnerAddress { get; set; }
    public string OwnerPhone { get; set; }

    public string TenantName { get; set; }
    public DateTime TenantDateOfBirth { get; set; }
    public string TenantCitizenIdentity { get; set; }
    public string TenantAddress { get; set; }
    public string TenantPhone { get; set; }

    public string RoomName { get; set; }
    public string RoomArea { get; set; }
    public string RoomLength { get; set; }
    public string RoomWidth { get; set; }
    public string NumOfDoors { get; set; }
    public string NumOfWindows { get; set; }
    public string NumOfBathRooms { get; set; }
    public string NumOfWCs { get; set; }
    public string MaximumPeople { get; set; }
    public string HostelAddress { get; set; }


    /*navigation props*/

    // 1 scaffolding M commitment
    public Guid CommitmentScaffoldingId { get; set; }
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
    // add to room tenant
    public virtual ICollection<RoomTenant> RoomTenants { get; set; }
}
