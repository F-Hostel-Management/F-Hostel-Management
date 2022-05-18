using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Interfaces;

public interface IApplicationDbContext
{
    DbSet<UserEntity> Users { get; set; }
    Task<int> SaveChangesAsync();

    DbSet<TEntity> Set<TEntity>() where TEntity : class;
}
