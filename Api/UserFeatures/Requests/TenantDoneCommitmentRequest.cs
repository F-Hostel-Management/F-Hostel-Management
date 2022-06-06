using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests;

public class TenantDoneCommitmentRequest
{
    [Required]
    [Range(100000, 1000000)]
    public int SixDigitsJoiningCode { get; set; }
}
