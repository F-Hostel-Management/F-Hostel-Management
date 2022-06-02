using Domain.Entities.Room;
using Domain.Enums;

namespace Application.Interfaces;

public interface IRoomServices
{
    Task Rent(RoomEntity room);
    Task<RoomEntity> GetRoom(Guid Id, RoomStatus status);
    Task<RoomEntity> GetRoom(Guid Id);
}
