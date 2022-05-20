using AutoMapper;

namespace Api.Mappings;

public interface IMapFrom<T>
{
    void MappingFrom(Profile profile) => profile.CreateMap(typeof(T), GetType())
                .ForAllMembers(opt => opt.Condition(
            (srs, dest, sourceMember) => sourceMember != null
            )
        );
}
