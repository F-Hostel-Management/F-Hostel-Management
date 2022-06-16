using System.ComponentModel.DataAnnotations;
using Api.Mappings;
using Domain.Entities.Facility;

namespace Api.UserFeatures.Requests;

public class AddFacilityToRoomRequest:IMapTo<FacilityManagement>
{
    [Required]
    public IList<FacilityRoom> FacilityRooms { get; set; }
    [Required]
    public Guid RoomId { get; set; }

}

public class FacilityRoom
{
    [Required]
    public Guid FacilityId { get; set; }
    public String? Description { get; set; }
    [Required]
    public int Quantity { get; set; }
}