using Domain.Entities.Notification;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Contexts.EntityTypeConfigurations;
public class NotificationEntityTypeConfiguration : IEntityTypeConfiguration<NotificationEntity>
{
    public void Configure(EntityTypeBuilder<NotificationEntity> builder)
    {
        builder
            .HasOne(nt => nt.Transaction)
            .WithMany(n => n.Notifications)
            .HasForeignKey(ni => ni.TransactionId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
