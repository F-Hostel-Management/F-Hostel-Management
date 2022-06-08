using System.ComponentModel.DataAnnotations;
using Api.Mappings;
using Domain.Entities.Facility;

namespace Api.UserFeatures.Requests;

public class UpdateFacilityToRoomRequest:IMapTo<FacilityManagement>
{
    public Guid FacilityManagementId { get; set; }
    [Required]
    public int Quantity { get; set; }
    
    public string? Description { get; set; }
}