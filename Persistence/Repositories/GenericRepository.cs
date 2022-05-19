using Application.Interfaces;
using Application.Interfaces.IRepository;
using Ardalis.GuardClauses;
using Domain.Common;
using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
    public virtual async Task CreateAsync(T entity)
    {
        await dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public virtual async Task<T> DeleteAsync(Guid id)
    {
        T _entity = await FindByIdAsync(id);
        if (_entity == null)
        {
            return null;
        }
        dbSet.Remove(_entity);
        await _context.SaveChangesAsync();
        return _entity;
    }

    public virtual async Task<T> FindByIdAsync(Guid id)
    {
        T entity = await dbSet.FindAsync(id);
        return entity;
    }

    public virtual async Task<List<T>> ListAsync()
    {
        return await dbSet.ToListAsync();
    }

    public virtual Task<T> UpdateAsync(Guid id, T entity)
    {
        throw new NotImplementedException();
    }

    public IList<T> GetItems(Expression<Func<T, bool>> predicate)
    {
        List<T> list;
        var query = dbSet.AsQueryable();
        list = query.Where(predicate).ToList<T>();
        return list;
    }

    public IList<T> Where(Expression<Func<T, bool>> predicate, params string[] navigationProperties)
    {
        List<T> list;
        var query = dbSet.AsQueryable();
        foreach (string navigationProperty in navigationProperties)
            query = query.Include(navigationProperty);//got to reaffect it.
        list = query.Where(predicate).ToList<T>();
        return list;
    }

}
