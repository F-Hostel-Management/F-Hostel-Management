using Domain.Common;
namespace Domain.Entities.Facility;
public class FacilityCategory : BaseEntity, Category
{
    public string CategoryName { get; set; }
    /*navigation props*/

    // Facility
    public virtual ICollection<FacilityEntity> Facilities { get; set; }
}
