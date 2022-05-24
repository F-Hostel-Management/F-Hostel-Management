using Application.Interfaces.IRepository;
using Domain.Common;
using Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;



namespace Persistence.Repositories;
public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
{
    protected ApplicationDbContext _context;
    protected DbSet<T> dbSet;
    public GenericRepository(
        ApplicationDbContext context)
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

    public async Task<IList<T>> WhereAsync(Expression<Func<T, bool>> predicate, params string[] navigationProperties)
    {
        List<T> list;
        var query = dbSet.AsQueryable();
        foreach (string navigationProperty in navigationProperties)
            query = query.Include(navigationProperty);//got to reaffect it.
        list = await query.Where(predicate).ToListAsync<T>();
        return list;
    }

    public async Task UpdateAsync(T updated, T existing)
    {
        _context.Entry(existing).CurrentValues.SetValues(updated);
        await _context.SaveChangesAsync();
    }
}
