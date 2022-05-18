using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Contexts;

internal class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }

    public DbSet<UserEntity> Users { get; set; }

    public async Task<int> SaveChangesAsync()
    {
        return await base.SaveChangesAsync();
    }
}
