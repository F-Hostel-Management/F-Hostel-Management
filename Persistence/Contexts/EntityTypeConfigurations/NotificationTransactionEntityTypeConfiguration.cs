using Domain.Entities.Notification;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Contexts.EntityTypeConfigurations;
public class NotificationTransactionEntityTypeConfiguration : IEntityTypeConfiguration<NotificationTransaction>
{
    public void Configure(EntityTypeBuilder<NotificationTransaction> builder)
    {
        builder
            .HasOne(m => m.Manager)
            .WithMany(mt => mt.NotificationTransactions)
            .HasForeignKey(m=> m.ManagerId)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasOne(h => h.Hostel)
            .WithMany(ht => ht.NotificationTransactions)
            .HasForeignKey(hi => hi.HostelId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
