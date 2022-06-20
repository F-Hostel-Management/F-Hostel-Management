using Domain.Entities.Room;
using Domain.Enums;

namespace Application.Interfaces;

public interface IRoomServices
{
    Task RentThisRoom(RoomEntity room);
    Task<RoomEntity> GetRoom(Guid Id, RoomStatus status);
    Task<RoomEntity> GetRoom(Guid Id);
    Task<bool> HasTenant(Guid roomId, Guid tenantId);
    Task<bool> HasCommitment(Guid roomId);
}
