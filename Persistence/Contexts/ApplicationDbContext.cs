using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Infrastructure.Contexts;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        HostelModelCreating.OnModelCreating(modelBuilder);
    }

    public DbSet<UserEntity> Users { get; set; }
    public DbSet<HostelEntity> Hostels { get; set; }
    public DbSet<HostelCategory> HostelCategories { get; set; }
    public DbSet<Hostel_HostelCategory> Hostel_HostelCategories { get; set; }

}
