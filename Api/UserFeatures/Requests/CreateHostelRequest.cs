using Api.Mappings;
using Domain.Entities;

namespace Api.UserFeatures.Requests;

public class CreateHostelRequest : IMapTo<HostelEntity>
{
    public string Address { get; set; }
    public string Name { get; set; }
}
