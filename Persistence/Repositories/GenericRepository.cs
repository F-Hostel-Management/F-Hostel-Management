using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories;
public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
{
    protected IApplicationDbContext _context;
    protected DbSet<T> dbSet;
    public GenericRepository(
        IApplicationDbContext context)
    {
        _context = context;
        dbSet = context.Set<T>();
    }
    public async Task CreateAsync(T entity)
    {
        await dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<T> FindByIdAsync(Guid id)
    {
        T entity = await dbSet.FindAsync(id);
        return entity;
    }
}
