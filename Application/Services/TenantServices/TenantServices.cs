using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Enums;

namespace Application.Services.UserServices;

public class TenantServices : ITenantServices
{
    private readonly IGenericRepository<UserEntity> _userRepository;

    public TenantServices(
        IGenericRepository<UserEntity> userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task GetIntoRoom(CommitmentEntity commitment, UserEntity tenant)
    {
        tenant.RoomId = commitment.RoomId;
        await _userRepository.UpdateAsync(tenant);
    }

    public async Task<UserEntity> GetTenant(Guid tenantId)
    {

        UserEntity tenant =
            await _userRepository.FirstOrDefaultAsync(user =>
            user.Id.Equals(tenantId)
            && user.RoleString.Equals(Role.Tenant.ToString()));
        return tenant;
    }
}
