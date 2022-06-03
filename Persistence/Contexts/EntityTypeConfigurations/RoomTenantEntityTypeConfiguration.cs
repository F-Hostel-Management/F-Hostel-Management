using Domain.Entities.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Contexts.EntityTypeConfigurations;

internal class RoomTenantEntityTypeConfiguration : IEntityTypeConfiguration<RoomTenant>
{
    public void Configure(EntityTypeBuilder<RoomTenant> builder)
    {
        builder
            .HasOne(r => r.Room)
            .WithMany(rt => rt.RoomTenants)
            .HasForeignKey(ri => ri.RoomId)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasOne(t => t.Tenant)
            .WithMany(rt => rt.RoomTenants)
            .HasForeignKey(ti => ti.TenantId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
