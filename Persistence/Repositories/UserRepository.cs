using Application.Interfaces;
using Domain.Entities;

namespace Infrastructure.Repositories;

internal class UserRepository : IUserRepository
{
    private readonly IApplicationDbContext _context;

    public UserRepository(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task CreateAsync(UserEntity user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
    }

    public async Task<UserEntity> FindByIdAsync(Guid id)
    {
        var user = await _context.Users.FindAsync(id);
        return user;
    }
}
