using Api.Filters;
using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Facility;
using Domain.Entities.Invoice;
using Domain.Entities.InvoiceSchedule;
using Domain.Entities.Message;
using Domain.Entities.Notification;
using Domain.Entities.Room;
using Domain.Entities.Ticket;
using Microsoft.AspNetCore.OData;
//using Microsoft.OData.Edm;
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
                    options.Filters.Add<ValidateModelStateFilter>();
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
                           .Filter()
                           .OrderBy()
                           .Expand()
                           .Count()
                           .Select()
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
        builder.EntitySet<FacilityEntity>("Facilities");

        builder.EntitySet<InvoiceScheduleEntity>("InvoiceSchedules");
        builder.EntitySet<InvoiceEntity>("Invoices");

        builder.EntitySet<NotificationEntity>("Notifications");
        builder.EntitySet<Notification_Room>("RoomNotifications");
        
        builder.EntitySet<TicketEntity>("Tickets");

        builder.EntitySet<MessageEntity>("Messages");
        builder.EntitySet<CommitmentEntity>("Commitments");

        return builder.GetEdmModel();
    }
}
