using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.IRepository;
public interface IGenericRepository<T> where T : BaseEntity
{
    Task CreateAsync(T entity);
    Task<T> FindByIdAsync(Guid id);
}
