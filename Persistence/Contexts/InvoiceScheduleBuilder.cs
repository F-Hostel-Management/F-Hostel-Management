using Domain.Entities.InvoiceSchedule;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Contexts;
public class InvoiceScheduleBuilder
{
    public static void OnModelCreating(ModelBuilder modelBuilder)
    {
        // 1 Manager (make) M InvoiceSchedules (for) 1 Room
        {
            modelBuilder.Entity<InvoiceScheduleEntity>()
                .HasOne(m => m.Manager)
                .WithMany(mci => mci.ManegerCreatedInvoiceSchedules)
                .HasForeignKey(mi => mi.ManagerId)
                .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<InvoiceScheduleEntity>()
                .HasOne(r => r.Room)
                .WithMany(mci => mci.ManegerCreatedInvoiceSchedules)
                .HasForeignKey(ri => ri.RoomId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
