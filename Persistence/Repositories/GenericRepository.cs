using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Common;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Reflection;


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

    public IList<T> Where(Expression<Func<T, bool>> predicate, params string[] navigationProperties)
    {
        List<T> list;
        var query = dbSet.AsQueryable();
        foreach (string navigationProperty in navigationProperties)
            query = query.Include(navigationProperty);//got to reaffect it.
        list = query.Where(predicate).ToList<T>();
        return list;
    }


    public virtual async Task<T> Update(object dto, Guid Id)
    {
        var current = dbSet.FirstOrDefault(x => x.Id == Id);

        if (current == null)
        {
            return null;
        }

        var dtoProp = dto.GetType().GetProperties();

        foreach (var prop in dtoProp)
        {
            if (prop.GetValue(dto) != null)
            {
                SetObjectProperty(prop.Name, prop.GetValue(dto), current);
                //Console.WriteLine(prop.GetValue(dto));
            }
        }

        //_context.Entry(current).CurrentValues.SetValues(dto);
        await _context.SaveChangesAsync();
        return current;
    }

    private void SetObjectProperty(string propertyName, object value, object obj)
    {
        PropertyInfo propertyInfo = obj.GetType().GetProperty(propertyName);
        // make sure object has the property we are after
        if (propertyInfo != null)
        {
            propertyInfo.SetValue(obj, value, null);
        }
    }
}
