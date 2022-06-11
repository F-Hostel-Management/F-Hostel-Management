using Domain.Common;
using System.Linq.Expressions;

namespace Application.Interfaces.IRepository;
public interface IGenericRepository<T> where T : BaseEntity
{
    Task CreateAsync(T entity);
    Task CreateRangeAsync(IEnumerable<T> entities);
    Task<List<T>> ListAsync();
    Task<T> FindByIdAsync(Guid id, params string[] navigationProperties);
    Task<IList<T>> WhereAsync(Expression<Func<T, bool>> predicate, params string[] navigationProperties);
    Task UpdateAsync(T updated);
    Task<T> DeleteAsync(Guid id);
    Task<T> DeleteSoftAsync(Guid id);
    Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate);
    Task<T> FirstOrDefaultTrackingAsync(Expression<Func<T, bool>> predicate);
    Task UpdateRangeAsync(IEnumerable<T> entities);
    Task<long> SumAsync(Expression<Func<T, bool>> predicate, Expression<Func<T, long>> sumExpression);
}
