using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests;

public class TenantDoneCommitmentRequest
{
    /*[Required]
    public Guid RoomId { get; set; }*/
    [Required]
    public Guid TenantId { get; set; }
    [Required]
    [Range(100000, 1000000)]
    public int SixDigitsJoiningCode { get; set; }
}
