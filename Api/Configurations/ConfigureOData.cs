using Domain.Entities;
using Domain.Entities.Room;
using Microsoft.AspNetCore.OData;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using System.Text.Json;

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
                }
            )
            .AddOData(
                options =>
                    options.AddRouteComponents("/api/ODatav1", GetEdmModel())
                           .Select()
                           .Filter()
                           .OrderBy()
                           .Expand()
                           .Count()
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
