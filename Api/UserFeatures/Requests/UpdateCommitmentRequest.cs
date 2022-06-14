using Api.Mappings;
using Domain.Entities.Commitment;
using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests;

public class UpdateCommitmentRequest : IMapTo<CommitmentEntity>
{
    public double? Price { get; set; }
    public DateTime? CreatedDate { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    /*public Guid? ScaffoldingId { get; set; } */

    [Required]
    public int? DateOverdue { get; set; }

    public double? Compensation { get; set; }

}
