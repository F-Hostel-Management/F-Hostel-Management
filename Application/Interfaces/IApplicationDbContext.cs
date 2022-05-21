using Domain.Common;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Application.Interfaces;

public interface IApplicationDbContext
{
    //DbSet<UserEntity> Users { get; set; }
    Task<int> SaveChangesAsync();

    DbSet<TEntity> Set<TEntity>() where TEntity : class;
    EntityEntry Entry(object entity);
}
