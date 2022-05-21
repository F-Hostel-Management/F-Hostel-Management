using Domain.Entities;
using Domain.Entities.Hostel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Contexts;
public class HostelModelCreating
{
    public static void OnModelCreating(ModelBuilder modelBuilder)
    {
        // hostel - category
        {
            modelBuilder.Entity<Hostel_HostelCategory>()
                .HasOne(c => c.Category)
                .WithMany(hc => hc.HostelCategories)
                .HasForeignKey(ci => ci.CategoryId);

            modelBuilder.Entity<Hostel_HostelCategory>()
                .HasOne(h => h.Hostel)
                .WithMany(hc => hc.HostelCategories)
                .HasForeignKey(hi => hi.HostelId);
        }

        // hostel - manager
        {
            modelBuilder.Entity<HostelManagement>()
                .HasOne(h => h.Hostel)
                .WithMany(hm => hm.HostelManagements)
                .HasForeignKey(hi => hi.HostelId);
            modelBuilder.Entity<HostelManagement>()
                .HasOne(m => m.Manager)
                .WithMany(hm => hm.HostelManagements)
                .HasForeignKey(mi => mi.ManagerId)
                .OnDelete(DeleteBehavior.NoAction);
        }

    }
}
