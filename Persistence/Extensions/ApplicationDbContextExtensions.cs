using Domain.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Infrastructure.Extensions
{
    public static class ApplicationDbContextExtensions
    {
        public static void AddIsDeletedQueryFilter(this ModelBuilder modelBuilder)
        {
            var entityTypes = modelBuilder.Model.GetEntityTypes();

            Expression<Func<BaseEntity, bool>> filterExpression = entity => !entity.IsDeleted;

            foreach (var entityType in entityTypes)
            {
                if (!entityType.ClrType.IsAssignableTo(typeof(BaseEntity))) return;

                var parameter = Expression.Parameter(entityType.ClrType);
                var body = ReplacingExpressionVisitor.Replace(filterExpression.Parameters.First(),
                                                              parameter,
                                                              filterExpression.Body);
                var lambdaExpression = Expression.Lambda(body, parameter);
                entityType.SetQueryFilter(lambdaExpression);

            }
        }
    }
}
