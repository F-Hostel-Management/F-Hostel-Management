using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Room;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Contexts;
public class CommitmentContainsEntityTypeConfiguration : IEntityTypeConfiguration<CommitmentContains>
{
    public void Configure(EntityTypeBuilder<CommitmentContains> builder)
    {
        // M Commitments (belong to ) M Teanants
        builder
            .HasOne(c => c.Commitment)
            .WithMany(ct => ct.CommitmentContains)
            .HasForeignKey(ci => ci.CommitmentId)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasOne(t => t.Tenant)
            .WithMany(ct => ct.CommitmentContains)
            .HasForeignKey(ti => ti.TenantId)
            .OnDelete(DeleteBehavior.NoAction);


    }
}
