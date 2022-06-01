using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Entities.Room;
using Domain.Enums;

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

    public async Task<RoomEntity> GetAvailableRoomByIdAsync(Guid Id)
    {
        return await _roomRepository
            .FirstOrDefaultAsync(room => 
            room.Id.Equals(Id)
            && room.Status.Equals(RoomStatus.Available.ToString())
            );
    }

    public async Task<RoomEntity> GetRoomByIdAsync(Guid Id)
    {
        return await _roomRepository.FindByIdAsync(Id);
    }
}
