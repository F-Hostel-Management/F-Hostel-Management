using Domain.Entities.Invoice;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Contexts;
public class InvoiceEntityTypeConfiguration : IEntityTypeConfiguration<InvoiceEntity>
{
    public void Configure(EntityTypeBuilder<InvoiceEntity> builder)
    {
        // 1 Manager (create) M Invoices (for) 1 Room
        builder
            .HasOne(m => m.Manager)
            .WithMany(mci => mci.ManagerCreatedInvoices)
            .HasForeignKey(mi => mi.ManagerId)
            .OnDelete(DeleteBehavior.NoAction);


        builder
            .HasOne(r => r.Room)
            .WithMany(mci => mci.ManagerCreatedInvoices)
            .HasForeignKey(ri => ri.RoomId)
            .OnDelete(DeleteBehavior.NoAction);

    }
}
