using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using AutoWrapper.Wrappers;
using Domain.Entities.Room;
using Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace Application.Services.RoomServices;

public class RoomServices : IRoomServices
{
    private readonly IGenericRepository<RoomEntity> _roomRepository;
    private readonly IHostelServices _hostelServices;
    public RoomServices(
        IGenericRepository<RoomEntity> roomRepository, IHostelServices hostelServices)
    {
        _roomRepository = roomRepository;
        _hostelServices = hostelServices;
    }
    public async Task Rent(RoomEntity room)
    {
        room.RoomStatus = RoomStatus.Rented;
        await _roomRepository.UpdateAsync(room);
    }

    // return room entity
    // not found ==> throw exception
    public async Task<RoomEntity> GetRoom(Guid Id, RoomStatus status)
    {
        RoomEntity room = await _roomRepository
            .FirstOrDefaultAsync(room =>
            room.Id.Equals(Id)
            && room.Status.Equals(status.ToString())
            );

        return room ??
            throw new NotFoundException($"Room not found");
    }

    public async Task<RoomEntity> GetRoom(Guid Id)
    {
        RoomEntity room = await _roomRepository.FindByIdAsync(Id);

        return room ??
            throw new NotFoundException($"Room not found");
    }

    public async Task<bool> RoomManagedBy(Guid roomId, Guid userId)
    {
        var room = await _roomRepository.FindByIdAsync(roomId);
        if (room == null) throw new NotFoundException($"Room not found");

        var hostelId = room.HostelId;
        return await _hostelServices.IsHostelManagedBy(hostelId, userId);
    }

    public async Task<bool> HasTenant(Guid roomId, Guid userId)
    {
        var room = (await _roomRepository.WhereAsync(room => room.Id == roomId, new string[] {"RoomTenants"})).FirstOrDefault();
        if (room == null) throw new NotFoundException($"Room not found");

        return room.RoomTenants.Any(roomTenant => roomTenant.TenantId == userId);
    }
}
