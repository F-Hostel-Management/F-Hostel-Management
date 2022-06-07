using Domain.Common;
using Domain.Entities.Room;

namespace Domain.Entities.Facility;

public class FacilityManagement:BaseEntity
{
    public int Quantity { get; set; }
    public RoomEntity Room { get; set; }
    public HostelEntity Hostel { get; set; }
}