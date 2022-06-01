using Domain.Common;

namespace Domain.Entities.Commitment;

public class JoiningCode : BaseEntity
{
    // 1 com - 1 joining code
    public Guid CommitementId { get; set; }
    public CommitmentEntity Commitment { get; set; }
    public int _6DigitCode { get; set; }
    public DateTime CreateDate { get; set; }
    public int TimeSpan { get; set; }
}
