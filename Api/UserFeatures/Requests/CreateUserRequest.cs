using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Domain.Enums;

namespace Api.UserFeatures.Requests;

public class CreateUserRequest
{
    [Required]
    public string Name { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [Phone]
    public string Phone { get; set; }

    [Required]
    public string Password { get; set; }

    [Required]
    public Role Role { get; set; }
}
