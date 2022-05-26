using Domain.Entities.Notification;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Contexts;
public class RoomNotificationsEntityTypeConfiguration : IEntityTypeConfiguration<Notification_Room>
{
    public void Configure(EntityTypeBuilder<Notification_Room> builder)
    {
        // 1 Manager (create) M Notifications (for) M Rooms
        builder
            .HasOne(r => r.Room)
            .WithMany(rn => rn.RoomNotifications)
            .HasForeignKey(ri => ri.RoomId)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasOne(n => n.Notification)
            .WithMany(rn => rn.RoomNotifications)
            .HasForeignKey(ni => ni.NotificationId)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasOne(m => m.Manager)
            .WithMany(mcn => mcn.ManagerCreatedRoomNotifications)
            .HasForeignKey(mi => mi.ManagerId)
            .OnDelete(DeleteBehavior.NoAction);

    }
}
