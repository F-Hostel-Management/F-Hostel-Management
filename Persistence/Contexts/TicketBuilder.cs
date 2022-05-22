using Domain.Entities.Ticket;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Contexts;
public class TicketBuilder
{
    public static void OnModelCreating(ModelBuilder modelBuilder)
    {
        // 1 Tenant (create) M Tickets (for) 1 Room
        {
            modelBuilder.Entity<TicketEntity>()
                .HasOne(t => t.Tenant)
                .WithMany(tt => tt.Tickets)
                .HasForeignKey(ti => ti.TenantId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<TicketEntity>()
                .HasOne(r => r.Room)
                .WithMany(rt => rt.Tickets)
                .HasForeignKey(ri => ri.RoomId)
                .OnDelete(DeleteBehavior.NoAction);
        }

    }
}
