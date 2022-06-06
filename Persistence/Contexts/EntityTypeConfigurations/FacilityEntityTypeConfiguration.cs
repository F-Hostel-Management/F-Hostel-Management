using Domain.Entities.Facility;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Contexts.EntityTypeConfigurations;
public class FacilityEntityTypeConfiguration : IEntityTypeConfiguration<FacilityEntity>
{
    public void Configure(EntityTypeBuilder<FacilityEntity> builder)
    {
        builder
            .HasOne(fc => fc.FacilityCategory)
            .WithMany(f => f.Facilities)
            .HasForeignKey(fci => fci.FacilityCategoryId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
