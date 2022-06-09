using Domain.Entities.Facility;
using Domain.Entities.Room;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Contexts.EntityTypeConfigurations;
public class RoomEntityTypeConfiguration : IEntityTypeConfiguration<RoomEntity>
{
    public void Configure(EntityTypeBuilder<RoomEntity> builder)
    {
        builder
            .HasOne(r => r.RoomType)
            .WithMany(r => r.Rooms)
            .HasForeignKey(rti => rti.RoomTypeId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
