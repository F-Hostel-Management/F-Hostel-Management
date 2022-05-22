using Domain.Entities;
using Domain.Entities.Hostel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Contexts;
public class HostelBuilder
{
    public static void OnModelCreating(ModelBuilder modelBuilder)
    {
        // M hostel - M manager
        {
            modelBuilder.Entity<HostelManagement>()
                .HasOne(h => h.Hostel)
                .WithMany(hm => hm.HostelManagements)
                .HasForeignKey(hi => hi.HostelId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<HostelManagement>()
                .HasOne(m => m.Manager)
                .WithMany(hm => hm.HostelManagements)
                .HasForeignKey(mi => mi.ManagerId)
                .OnDelete(DeleteBehavior.NoAction);
        }
        
    }
}
