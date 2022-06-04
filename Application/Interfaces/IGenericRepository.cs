using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.IRepository;
public interface IGenericRepository<T> where T : BaseEntity
{
    Task CreateAsync(T entity);
    Task CreateRangeAsync(T[] entities);
    Task<List<T>> ListAsync();
    Task<T> FindByIdAsync(Guid id);
    Task<IList<T>> WhereAsync(Expression<Func<T, bool>> predicate, params string[] navigationProperties);
    Task UpdateAsync(T updated);
    Task<T> DeleteAsync(Guid id);
    Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate);
}
