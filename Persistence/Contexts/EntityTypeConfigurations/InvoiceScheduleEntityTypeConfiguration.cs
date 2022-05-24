using Domain.Entities.InvoiceSchedule;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Contexts;
public class InvoiceScheduleEntityTypeConfiguration : IEntityTypeConfiguration<InvoiceScheduleEntity>
{


    public void Configure(EntityTypeBuilder<InvoiceScheduleEntity> builder)
    {
        // 1 Manager (make) M InvoiceSchedules (for) 1 Room
        builder
            .HasOne(m => m.Manager)
            .WithMany(mci => mci.ManegerCreatedInvoiceSchedules)
            .HasForeignKey(mi => mi.ManagerId)
            .OnDelete(DeleteBehavior.NoAction);


        builder
            .HasOne(r => r.Room)
            .WithMany(mci => mci.ManegerCreatedInvoiceSchedules)
            .HasForeignKey(ri => ri.RoomId)
            .OnDelete(DeleteBehavior.NoAction);

    }
}
