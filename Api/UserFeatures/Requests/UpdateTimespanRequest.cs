using Api.Mappings;
using Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests;

public class UpdateTimespanRequest : IMapTo<HostelEntity>
{
    [Required]
    [Range(1, 60 * 24)]
    public int QrTimeSpan { get; set; }
}
