using Domain.Entities.Commitment;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Contexts.EntityTypeConfigurations
{
    internal class CommitmentEntityTypeConfiguration : IEntityTypeConfiguration<CommitmentEntity>
    {
        public void Configure(EntityTypeBuilder<CommitmentEntity> builder)
        {
            builder
                .HasOne(r => r.Room)
                .WithMany(c => c.Commitments)
                .HasForeignKey(ri => ri.RoomId)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(o => o.Owner)
                .WithMany(c => c.OwnerCommitments)
                .HasForeignKey(oi => oi.OwnerId)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(m => m.Manager)
                .WithMany(c => c.ManagerCommitments)
                .HasForeignKey(mi => mi.ManagerId)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(t => t.Tenant)
                .WithMany(c => c.TenantCommitments)
                .HasForeignKey(ti => ti.TenantId)
                .OnDelete(DeleteBehavior.NoAction);


        }
    }
}
