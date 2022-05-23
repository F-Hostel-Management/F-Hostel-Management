using Domain.Entities;
using Domain.Entities.Hostel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Contexts;
public class HostelManagementsEntityTypeConfiguration : IEntityTypeConfiguration<HostelManagement>
{
    public void Configure(EntityTypeBuilder<HostelManagement> builder)
    {
        // M hostel - M manager

        builder
           .HasOne(h => h.Hostel)
           .WithMany(hm => hm.HostelManagements)
           .HasForeignKey(hi => hi.HostelId)
           .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasOne(m => m.Manager)
            .WithMany(hm => hm.HostelManagements)
            .HasForeignKey(mi => mi.ManagerId)
            .OnDelete(DeleteBehavior.NoAction);

    }
}
