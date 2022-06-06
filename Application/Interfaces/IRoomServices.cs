using Domain.Entities.Room;
using Domain.Enums;

namespace Application.Interfaces;

public interface IRoomServices
{
    Task Rent(RoomEntity room);
    Task<RoomEntity> GetRoom(Guid Id, RoomStatus status);
    Task<RoomEntity> GetRoom(Guid Id);
    Task<bool> RoomManagedBy(Guid roomId, Guid userId);
    Task<bool> HasTenant(Guid roomId, Guid tenantId);
}
