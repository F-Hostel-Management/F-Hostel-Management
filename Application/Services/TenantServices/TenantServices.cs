using Application.Interfaces;
using Application.Interfaces.IRepository;
using AutoWrapper.Wrappers;
using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Room;
using Domain.Entities.User;
using Domain.Enums;
using Microsoft.AspNetCore.Http;

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
    public async Task GetIntoRoom(Guid roomId, Guid tenantId)
    {
        var currentTenantsInRoom = await _roomTenantRepository.WhereAsync(rt =>
            rt.RoomId.Equals(roomId));
        
        // check tenant is already in room?
        var tenantInRoom = currentTenantsInRoom.FirstOrDefault(rt =>
            rt.TenantId.Equals(tenantId));
        if (tenantInRoom != null)
        {
            throw new ApiException("Cannot Get Into Room", StatusCodes.Status400BadRequest);
        }

        int count = 0;
        if (currentTenantsInRoom.Any())
        {
           count = currentTenantsInRoom.Count();
        }

        RoomEntity room = await _roomServices.GetRoom(roomId);

        if (room.MaximumPeople > 0 && room.MaximumPeople <= count)
        {
            throw new ApiException("Cannot Get Into Room", StatusCodes.Status400BadRequest);
        }

        await _roomTenantRepository.CreateAsync(
            new RoomTenant()
            {
                TenantId = tenantId,
                RoomId = roomId
            });
    }
}
