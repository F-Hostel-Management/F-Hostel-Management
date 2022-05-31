using Domain.Entities.Room;

namespace Application.Interfaces;

public interface IRoomServices
{
    Task Rent(RoomEntity room);
    Task<RoomEntity> GetAvailableRoomByIdAsync(Guid Id);
}
