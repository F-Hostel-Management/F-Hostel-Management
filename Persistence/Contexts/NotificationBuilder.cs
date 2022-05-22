using Domain.Entities.Notification;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Contexts;
public class NotificationBuilder
{

    public static void OnModelCreating(ModelBuilder modelBuilder)
    {
        // 1 Manager (create) M Notifications (for) M Rooms
        {
            modelBuilder.Entity<Notification_Room>()
                .HasOne(r => r.Room)
                .WithMany(rn => rn.RoomNotifications)
                .HasForeignKey(ri => ri.RoomId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Notification_Room>()
                .HasOne(n => n.Notification)
                .WithMany(rn => rn.RoomNotifications)
                .HasForeignKey(ni => ni.NotificationId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Notification_Room>()
                .HasOne(m => m.Manager)
                .WithMany(mcn => mcn.ManagerCreatedRoomNotifications)
                .HasForeignKey(mi => mi.ManagerId)
                .OnDelete(DeleteBehavior.NoAction);
        }

    }
}
