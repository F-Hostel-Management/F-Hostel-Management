using Domain.Entities.Ticket;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Contexts;
public class TicketEntityTypeConfiguration : IEntityTypeConfiguration<TicketEntity>
{
    public void Configure(EntityTypeBuilder<TicketEntity> builder)
    {
        // 1 Tenant (create) M Tickets (for) 1 Room
        builder
            .HasOne(t => t.Tenant)
            .WithMany(tt => tt.Tickets)
            .HasForeignKey(ti => ti.TenantId)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasOne(r => r.Room)
            .WithMany(rt => rt.Tickets)
            .HasForeignKey(ri => ri.RoomId)
            .OnDelete(DeleteBehavior.NoAction);

    }
}
