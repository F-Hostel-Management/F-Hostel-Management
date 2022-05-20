using Domain.Enums;
using System.ComponentModel.DataAnnotations;


namespace Api.UserFeatures.Requests;

public class UpdateUserRequest
{
    public string Name { get; set; }

    [EmailAddress]
    public string Email { get; set; }

    [Phone]
    public string Phone { get; set; }
    public string Password { get; set; }
    [Range(0, 2)]
    public Role Role { get; set; }

}
