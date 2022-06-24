using Domain.Common;

namespace Domain.Entities.Commitment;
public class CommitmentImages : BaseEntity
{
    public string ImgUrl { get; set; }

    public Guid CommitmentId { get; set; }
    public CommitmentEntity Commitment { get; set; }
}
