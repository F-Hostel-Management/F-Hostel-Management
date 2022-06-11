using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Facility;
using Domain.Entities.Invoice;
using Domain.Entities.InvoiceSchedule;
using Domain.Entities.Message;
using Domain.Entities.Notification;
using Domain.Entities.Room;
using Domain.Entities.Ticket;
using Domain.Entities.User;
using Microsoft.EntityFrameworkCore;

namespace Application.Interfaces;

public interface IApplicationDbContext
{
    DbSet<UserEntity> Users { get; set; }
    public DbSet<RoomTenant> RoomTenants { get; set; }
    public DbSet<HostelEntity> Hostels { get; set; }
    public DbSet<RoomEntity> Rooms { get; set; }
    public DbSet<RoomType> RoomTypes { get; set; }
    public DbSet<FacilityEntity> Facilities { get; set; }
    public DbSet<FacilityManagement> FacilityManagements { get; set; }
    public DbSet<InvoiceScheduleEntity> InvoiceSchedules { get; set; }
    public DbSet<InvoiceEntity> Invoices { get; set; }
    public DbSet<NotificationEntity> Notifications { get; set; }
    public DbSet<TicketEntity> Tickets { get; set; }
    public DbSet<MessageEntity> Messages { get; set; }
    public DbSet<CommitmentEntity> Commitments { get; set; }
    public DbSet<JoiningCode> JoiningCodes { get; set; }
    public DbSet<CommitmentScaffolding> CommitmentScaffoldings { get; set; }
}
