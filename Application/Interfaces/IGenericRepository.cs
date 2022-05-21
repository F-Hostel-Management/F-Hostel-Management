using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.IRepository;
public interface IGenericRepository<T> where T : BaseEntity
{
    // c
    Task CreateAsync(T entity);
    // r
    Task<List<T>> ListAsync();
    Task<T> FindByIdAsync(Guid id);
    // u
    Task UpdateAsync(T updated, T existing);
    // d
    Task<T> DeleteAsync(Guid id);
}
