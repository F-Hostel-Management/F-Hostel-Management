using System.ComponentModel.DataAnnotations;
using Api.Mappings;
using Domain.Entities.Facility;

namespace Api.UserFeatures.Requests
{
    public class CreateFacilityRequest:IMapTo<FacilityEntity>
    {
        [Required]
        public Guid HostelId { set; get; }
        [Required]
        public string Name { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public string Type { get; set; }
    }
}
