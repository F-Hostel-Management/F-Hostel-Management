﻿using Domain.Entities;
using Domain.Entities.Commitment;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Contexts.EntityBuilders;
public class UserEntityTypeConfiguration : IEntityTypeConfiguration<UserEntity>
{
    public void Configure(EntityTypeBuilder<UserEntity> builder)
    {
        // 1 Commitment (belong to) 1 manager
        builder
            .HasOne(c => c.Commitment)
            .WithOne(m => m.Manager)
            .HasForeignKey<CommitmentEntity>(mi => mi.ManagerId)
            .OnDelete(DeleteBehavior.NoAction);



        // 1 room - M tenants
        builder
            .HasOne(r => r.Room)
            .WithMany(rt => rt.Tenants)
            .HasForeignKey(ri => ri.RoomId)
            .OnDelete(DeleteBehavior.NoAction);

    }
}
