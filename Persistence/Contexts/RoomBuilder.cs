using Domain.Entities;
using Domain.Entities.Hostel;
using Domain.Entities.Room;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Contexts;
public class RoomBuilder
{
    public static void OnModelCreating(ModelBuilder modelBuilder)
    {
        // room - tenants
        {
            modelBuilder.Entity<UserEntity>()
                .HasOne(r => r.Room)
                .WithMany(rt => rt.Tenants)
                .HasForeignKey(ri => ri.RoomId)
                .OnDelete(DeleteBehavior.NoAction);
        }

    }
}
