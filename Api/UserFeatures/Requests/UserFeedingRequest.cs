using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests;

public class UserFeedingRequest
{
    [Required]
    public int Quantity { get; set; }
    
    [Required]
    [Range(0, 2)]
    public Role Role { get; set; }
}
