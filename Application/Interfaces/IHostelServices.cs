using Domain.Entities;
using Domain.Entities.Room;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces;
public interface IHostelServices
{
    Task<HostelEntity> GetHostel(RoomEntity room);

    Task<HostelEntity> UploadHostelImage(HostelEntity hostel, IFormFile image);

    Task<bool> IsHostelManagedBy(Guid hostelID, Guid userID);
    Task<bool> IsHostelManagedBy(HostelEntity hostel, Guid userId);
}
