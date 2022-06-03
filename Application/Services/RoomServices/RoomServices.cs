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
    public RoomServices(
        IGenericRepository<RoomEntity> roomRepository
        )
    {
        _roomRepository = roomRepository;
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
            throw new ApiException($"Room not found", StatusCodes.Status404NotFound);
    }

    public async Task<RoomEntity> GetRoom(Guid Id)
    {
        RoomEntity room = await _roomRepository.FindByIdAsync(Id);

        return room ??
            throw new ApiException($"Room not found", StatusCodes.Status404NotFound);
    }
}
