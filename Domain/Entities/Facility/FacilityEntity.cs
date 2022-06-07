using Domain.Common;
using Domain.Entities.Room;

namespace Domain.Entities.Facility;
public class FacilityEntity : BaseEntity
{
    public string Name { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }
    public string Type { get; set; }
    
    /*navigation props*/
    public Guid HostelId { get; set; }
    public HostelEntity Hostel { get; set; }
}
