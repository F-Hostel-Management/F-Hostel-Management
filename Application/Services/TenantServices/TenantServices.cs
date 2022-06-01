using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Room;
using Domain.Entities.User;
using Domain.Enums;

namespace Application.Services.UserServices;

public class TenantServices : ITenantServices
{
    private readonly IGenericRepository<UserEntity> _userRepository;
    private readonly IGenericRepository<RoomTenant> _roomTenantRepository;
    private readonly IRoomServices _roomServices;

    public TenantServices(
        IGenericRepository<UserEntity> userRepository,
        IGenericRepository<RoomTenant> roomTenantRepository,
        IRoomServices roomServices
        )
    {
        _userRepository = userRepository;
        _roomTenantRepository = roomTenantRepository;
        _roomServices = roomServices;
    }

    // check joining code con hieu luc khong
    // ==> check room khong vuot qua so nguoi cho 
    public async Task<bool> GetIntoRoom(Guid roomId, Guid tenantId)
    {


        var currentTenantsInRoom = await _roomTenantRepository.WhereAsync(rt =>
            rt.RoomId.Equals(roomId));
        
        // check tenant is already in room?
        var tenantInRoom = currentTenantsInRoom.FirstOrDefault(rt =>
            rt.TenantId.Equals(tenantId));
        if (tenantInRoom != null)
        {
            return false;
        }

        int count = 0;
        if (currentTenantsInRoom.Any())
        {
           count = currentTenantsInRoom.Count();
        }

        RoomEntity room = await _roomServices.GetRoomByIdAsync(roomId);

        if (room.MaximumPeople > 0 && room.MaximumPeople <= count)
        {
            return false;
        } 

        await _roomTenantRepository.CreateAsync(
            new RoomTenant()
            {
                TenantId = tenantId,
                RoomId = roomId
            });
        return true;
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
