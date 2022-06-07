using Domain.Common;
using Domain.Entities.Room;

namespace Domain.Entities.Facility;
public class FacilityEntity : BaseEntity
{
    public string Name { get; set; }
    public double Price { get; set; }

    /*navigation props*/

    // 1 Room - M Facilities
    public Guid RoomId { get; set; }
    public RoomEntity Room { get; set; }
}
