using Domain.Entities.Facility;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Contexts.EntityTypeConfigurations;

public class FacilityManagementTypeConfiguration:IEntityTypeConfiguration<FacilityManagement>
{
    public void Configure(EntityTypeBuilder<FacilityManagement> builder)
    {
        builder
            .HasOne(e => e.Room)
            .WithMany(e => e.FacilityManagements)
            .HasForeignKey(e => e.RoomId)
            .OnDelete(DeleteBehavior.NoAction);
        builder
            .HasOne(e => e.Facility)
            .WithMany(e => e.FacilityManagements)
            .HasForeignKey(e => e.FacilityId)
            .OnDelete(DeleteBehavior.NoAction);
            
    }
}