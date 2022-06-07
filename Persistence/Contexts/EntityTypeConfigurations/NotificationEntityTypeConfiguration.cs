using Domain.Entities.Notification;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Contexts.EntityTypeConfigurations;

public class NotificationEntityTypeConfiguration : IEntityTypeConfiguration<NotificationEntity>
{
    public void Configure(EntityTypeBuilder<NotificationEntity> builder)
    {
        builder
            .HasOne(r => r.Room)
            .WithMany(n => n.Notifications)
            .HasForeignKey(ri => ri.RoomId)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasOne(m => m.Manager)
            .WithMany(n => n.Notifications)
            .HasForeignKey(mi => mi.ManagerId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
