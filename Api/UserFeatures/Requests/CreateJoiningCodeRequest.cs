using Api.Mappings;
using Domain.Entities.Commitment;
using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests;

public class CreateJoiningCodeRequest : IMapTo<JoiningCode>
{
    [Required]
    public Guid CommitementId { get; set; }
    [Required]
    [Range(1, 60*24, ErrorMessage = "Only positive number allowed")]
    public int TimeSpan { get; set; }
}
