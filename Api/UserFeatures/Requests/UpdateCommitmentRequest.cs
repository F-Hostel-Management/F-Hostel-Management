using Api.Mappings;
using Domain.Entities.Commitment;
using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests;

public class UpdateCommitmentRequest : IMapTo<CommitmentEntity>
{
    public double? Price { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    [Range(1, 31)]
    public int? PaymentDate { get; set; }
}
