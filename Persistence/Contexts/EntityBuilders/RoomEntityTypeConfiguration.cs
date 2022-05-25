using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Hostel;
using Domain.Entities.Room;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Contexts;
public class RoomEntityTypeConfiguration : IEntityTypeConfiguration<RoomEntity>
{
    public void Configure(EntityTypeBuilder<RoomEntity> builder)
    {
        // 1 Commitment (belong to) 1 Room
        builder
            .HasOne(c => c.Commitment)
            .WithOne(r => r.Room)
            .HasForeignKey<CommitmentEntity>(ri => ri.RoomId)
            .OnDelete(DeleteBehavior.NoAction);

    }
}
