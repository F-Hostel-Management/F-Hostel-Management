using Domain.Common;
using Domain.Entities.Room;

namespace Domain.Entities.Facility;
public class FacilityEntity : BaseEntity
{
    public string Name { get; set; }
    public double Price { get; set; }

    /*navigation props*/

    // category
    public Guid FacilityCategoryId { get; set; }
    public FacilityCategory FacilityCategory { get; set; }

    // room
    public Guid RoomId { get; set; }
    public RoomEntity Room { get; set; }
}
