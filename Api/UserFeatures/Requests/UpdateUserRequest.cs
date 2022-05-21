using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Api.Mappings;
using Domain.Entities;
using Domain.Enums;

namespace Api.UserFeatures.Requests;

public class UpdateUserRequest : IMapTo<UserEntity>
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
