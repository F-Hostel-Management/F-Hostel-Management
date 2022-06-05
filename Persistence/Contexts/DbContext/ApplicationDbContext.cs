using Application.Interfaces;
using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Facility;
using Domain.Entities.Hostel;
using Domain.Entities.Invoice;
using Domain.Entities.InvoiceSchedule;
using Domain.Entities.Message;
using Domain.Entities.Notification;
using Domain.Entities.Room;
using Domain.Entities.Ticket;
using Domain.Entities.User;
using Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Infrastructure.Contexts;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(HostelManagementsEntityTypeConfiguration).Assembly);
        modelBuilder.AddIsDeletedQueryFilter();
    }

    public DbSet<UserEntity> Users { get; set; }
    public DbSet<RoomTenant> RoomTenants { get; set; }
    public DbSet<HostelEntity> Hostels { get; set; }
    public DbSet<HostelManagement> HostelManagements { get; set; }
    public DbSet<HostelCategory> HostelCategories { get; set; }
    public DbSet<RoomEntity> Rooms { get; set; }
    public DbSet<RoomType> RoomTypes { get; set; }
    public DbSet<FacilityEntity> Facilities { get; set; }
    public DbSet<FacilityCategory> FacilityCategories { get; set; }
    public DbSet<InvoiceScheduleEntity> InvoiceSchedules { get; set; }
    public DbSet<InvoiceEntity> Invoices { get; set; }
    public DbSet<InvoiceType> InvoiceTypes { get; set; }
    public DbSet<NotificationEntity> Notifications { get; set; }
    public DbSet<Notification_Room> RoomNotifications { get; set; }
    public DbSet<TicketEntity> Tickets { get; set; }
    public DbSet<MessageEntity> Messages { get; set; }
    public DbSet<CommitmentEntity> Commitments { get; set; }
    public DbSet<JoiningCode> JoiningCodes { get; set; }
    public DbSet<CommitmentScaffolding> CommitmentScaffoldings { get; set; }

}
