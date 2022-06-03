using Domain.Entities;
using Domain.Entities.Room;

namespace Application.Interfaces;
public interface IHostelServices
{
    Task<HostelEntity> GetHostel(RoomEntity room);
}
