using Application.Interfaces;
using Ardalis.GuardClauses;
using Domain.Entities;
using Persistence.Repositories;

namespace Infrastructure.Repositories;

internal class UserRepository : GenericRepository<UserEntity>, IUserRepository
{
    public UserRepository(IApplicationDbContext context) : base(context)
    {
    }

    public override async Task<UserEntity> UpdateAsync(Guid id, UserEntity user)
    {
        Guard.Against.NullOrEmpty(id);
        UserEntity _user = await base.FindByIdAsync(id);
        if (_user == null)
        {
            return null;
        }
        {
            _user.Name = user.Name ?? _user.Name;
            _user.Email = user.Email ?? _user.Email;
            _user.Phone = user.Phone?? _user.Phone;
            await _context.SaveChangesAsync();
            return user;
        }
    }
}
