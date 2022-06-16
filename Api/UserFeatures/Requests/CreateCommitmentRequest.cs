using Api.Mappings;
using Domain.Entities.Commitment;
using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests;

public class CreateCommitmentRequest : IMapTo<CommitmentEntity>
{
    [Required]
    public Guid RoomId { get; set; }
    [Required]
    public double Price { get; set; }
    [Range(1, 31)]
    public int PaymentDate { get; set; }

    [Required]
    public DateTime StartDate { get; set; }
    [Required]
    public DateTime EndDate { get; set; }
    /*public Guid ScaffoldingId { get; set; }*/
    public int? DateOverdue { get; set; }

    public double? Compensation { get; set; }

}
