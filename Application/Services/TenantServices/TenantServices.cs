using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.User;
using Domain.Enums;

namespace Application.Services.UserServices;

public class TenantServices : ITenantServices
{
    private readonly IGenericRepository<UserEntity> _userRepository;
    private readonly IGenericRepository<RoomTenant> _roomTenantRepository;

    public TenantServices(
        IGenericRepository<UserEntity> userRepository,
        IGenericRepository<RoomTenant> roomTenantRepository
        )
    {
        _userRepository = userRepository;
        _roomTenantRepository = roomTenantRepository;
    }

    public async Task GetIntoRoom(Guid roomId, Guid tenantId)
    {
        await _roomTenantRepository.CreateAsync(
            new RoomTenant()
            {
                TenantId = tenantId,
                RoomId = roomId
            });
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
