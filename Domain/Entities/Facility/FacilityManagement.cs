using Domain.Common;
using Domain.Entities.Room;

namespace Domain.Entities.Facility;

public class FacilityManagement:BaseEntity
{
    public int Quantity { get; set; }
    public string? Description { get; set; }
    public RoomEntity Room { get; set; }
    public Guid RoomId { get; set; }
    public FacilityEntity Facility { get; set; }
    public Guid FacilityId { get; set; }
    
    
}