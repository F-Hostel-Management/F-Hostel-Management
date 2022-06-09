using Domain.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.Commitment;

[Table("JoiningCodes")]
public class JoiningCode : BaseEntity
{
    // 1 com - 1 joining code
    [Required]
    public Guid CommitmentId { get; set; }
    public CommitmentEntity Commitment { get; set; }
    [Required]
    public int SixDigitsCode { get; set; }
    [Required]
    public DateTime CreateDate { get; set; }
    [Required]
    public int TimeSpan { get; set; }
}
