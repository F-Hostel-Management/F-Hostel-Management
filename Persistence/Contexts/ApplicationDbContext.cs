using Application.Interfaces;
using Domain.Entities;
using Domain.Entities.Facility;
using Domain.Entities.Invoice;
using Domain.Entities.InvoiceSchedule;
using Domain.Entities.Room;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Infrastructure.Contexts;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        HostelBuilder.OnModelCreating(modelBuilder);
        RoomBuilder.OnModelCreating(modelBuilder);
    }

    public DbSet<UserEntity> Users { get; set; }
    public DbSet<HostelEntity> Hostels { get; set; }
    public DbSet<HostelCategory> HostelCategories { get; set; }
    public DbSet<RoomEntity> Rooms { get; set; }
    public DbSet<RoomType> RoomTypes { get; set; }
    public DbSet<FacilityEntity> Facilities { get; set; }
    public DbSet<FacilityCategory> FacilityCategories { get; set; }
    public DbSet<InvoiceScheduleEntity> InvoiceSchedules { get; set; }
    public DbSet<InvoiceEntity> InvoiceEntities { get; set; }
}
