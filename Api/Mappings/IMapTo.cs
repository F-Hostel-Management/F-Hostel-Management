using AutoMapper;

namespace Api.Mappings;

public interface IMapTo<T>
{
    void MappingTo(Profile profile) => profile.CreateMap(GetType(), typeof(T))
        .ForAllMembers(opt => opt.Condition(
            (srs, dest, sourceMember) => sourceMember != null
            )
        );
}
