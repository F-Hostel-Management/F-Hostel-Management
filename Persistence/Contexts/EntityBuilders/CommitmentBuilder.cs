using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Room;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Contexts;
public class CommitmentBuilder
{
    public static void OnModelCreating(ModelBuilder modelBuilder)
    {
        // M Commitments (belong to ) M Teanants
        {
            modelBuilder.Entity<CommitmentContains>()
                .HasOne(c => c.Commitment)
                .WithMany(ct => ct.CommitmentContains)
                .HasForeignKey(ci => ci.CommitmentId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<CommitmentContains>()
                .HasOne(t => t.Tenant)
                .WithMany(ct => ct.CommitmentContains)
                .HasForeignKey(ti => ti.TenantId)
                .OnDelete(DeleteBehavior.NoAction);
        }
        // 1 Commitment (belong to) 1 Room
        {
            modelBuilder.Entity<UserEntity>()
                .HasOne(c => c.Commitment)
                .WithOne(m => m.Manager)
                .HasForeignKey<CommitmentEntity>(mi => mi.ManagerId)
                .OnDelete(DeleteBehavior.NoAction);

        }

        // 1 Commitment (belong to) 1 Manager
        {
            modelBuilder.Entity<RoomEntity>()
                .HasOne(c => c.Commitment)
                .WithOne(r => r.Room)
                .HasForeignKey<CommitmentEntity>(ri => ri.RoomId)
                .OnDelete(DeleteBehavior.NoAction);
        }

    }
}
