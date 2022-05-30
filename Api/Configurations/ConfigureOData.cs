using Domain.Entities;
using Domain.Entities.Room;
using Microsoft.AspNetCore.OData;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Api.Configurations;

public static class ConfigureOData
{
    public static void AddOData(this IServiceCollection services)
    {
        services
            .AddControllers(
                options =>
                {
                    options.SuppressAsyncSuffixInActionNames = false;
                }
            )
            .AddJsonOptions(
                options =>
                {
                    options.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
                    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                }
            )
            .AddOData(
                options =>
                    options.AddRouteComponents("/odata", GetEdmModel())
                           .Select()
                           .Filter()
                           .OrderBy()
                           .Expand()
                           .Count()
                           .SetMaxTop(100)
            );
    }

    static IEdmModel GetEdmModel()
    {
        ODataConventionModelBuilder builder = new();
        builder.EntitySet<UserEntity>("Users");
        builder.EntitySet<HostelEntity>("Hostels");
        builder.EntitySet<RoomEntity>("Rooms");
        builder.EntitySet<RoomType>("RoomTypes");
        builder.EntitySet<HostelCategory>("HostelCategories");

        return builder.GetEdmModel();
    }
}
