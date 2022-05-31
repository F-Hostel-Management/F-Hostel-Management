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
        builder.EntitySet<FacilityEntity>("Facilities");
        builder.EntitySet<FacilityCategory>("FacilityCategories");

        builder.EntitySet<InvoiceScheduleEntity>("InvoiceSchedules");
        builder.EntitySet<InvoiceEntity>("Invoices");
        builder.EntitySet<InvoiceType>("InvoiceTypes");

        builder.EntitySet<NotificationEntity>("Notifications");
        builder.EntitySet<Notification_Room>("RoomNotifications");
        
        builder.EntitySet<TicketEntity>("Tickets");
        builder.EntitySet<TicketType>("TicketTypes");

        builder.EntitySet<MessageEntity>("Messages");
        builder.EntitySet<CommitmentEntity>("Commitments");

        return builder.GetEdmModel();
    }
}
