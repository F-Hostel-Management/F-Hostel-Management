using Api.Mappings;
using Domain.Entities;
using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests;

public class CreateGuestUserRequest : IMapTo<UserEntity>
{
    [Required]
    public string Name { get; set; }

    [Required]
    [Phone]
    public string Phone { get; set; }

    [Required]
    public DateTime? DateOfBirth { get; set; }

    [Required]
    [Range(0, 2)]
    public Gender Gender { get; set; }

    [Required]
    public string Address { get; set; }

    [Required]
    public string CitizenIdentity { get; set; }

}
