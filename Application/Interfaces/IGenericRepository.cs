﻿using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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

    Task<IList<T>> WhereAsync(Expression<Func<T, bool>> predicate, params string[] navigationProperties);
    // u
    Task UpdateAsync(T updated);
    // d
    Task<T> DeleteAsync(Guid id);

}
