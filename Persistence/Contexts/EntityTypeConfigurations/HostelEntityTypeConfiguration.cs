using Domain.Entities;
using Domain.Entities.Facility;
using Domain.Entities.Room;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Contexts.EntityTypeConfigurations;
public class HostelEntityTypeConfiguration : IEntityTypeConfiguration<HostelEntity>
{
    public void Configure(EntityTypeBuilder<HostelEntity> builder)
    {
        builder
            .HasOne(hc => hc.HostelCategory)
            .WithMany(h => h.Hostels)
            .HasForeignKey(hci => hci.HostelCategoryId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
