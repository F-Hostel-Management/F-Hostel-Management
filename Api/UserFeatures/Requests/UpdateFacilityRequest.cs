using Api.Mappings;
using Domain.Entities.Facility;

namespace Api.UserFeatures.Requests;

public class UpdateFacilityRequest:IMapTo<FacilityEntity>
{
    public Guid FacilityId { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public string Type { get; set; }
}