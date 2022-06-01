using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests;

public class OwnerApprovedCommitmentRequest
{
    [Required]
    public Guid CommitmentId { get; set; }
}
