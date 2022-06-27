using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests;

public class ValidateJoiningCodeRequest
{
    [Required, Range(99999, 999999)]
    public int SixDigitsCode { get; set; }
}
