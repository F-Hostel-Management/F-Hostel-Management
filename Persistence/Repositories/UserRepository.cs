using Application.Interfaces;
using Domain.Entities;

namespace Persistence.Repositories;

internal class UserRepository : GenericRepository<UserEntity>, IUserRepository
{
    public UserRepository(IApplicationDbContext context) : base(context)
    {
    }
}
