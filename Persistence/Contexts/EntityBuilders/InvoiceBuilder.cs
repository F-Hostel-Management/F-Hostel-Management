using Domain.Entities.Invoice;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Contexts;
public class InvoiceBuilder
{
    public static void OnModelCreating(ModelBuilder modelBuilder)
    {
        // 1 Manager (create) M Invoices (for) 1 Room
        {
            modelBuilder.Entity<InvoiceEntity>()
                .HasOne(m => m.Manager)
                .WithMany(mci => mci.ManagerCreatedInvoices)
                .HasForeignKey(mi => mi.ManagerId)
                .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<InvoiceEntity>()
                .HasOne(r => r.Room)
                .WithMany(mci => mci.ManagerCreatedInvoices)
                .HasForeignKey(ri => ri.RoomId)
                .OnDelete(DeleteBehavior.NoAction);

        }
    }
}
