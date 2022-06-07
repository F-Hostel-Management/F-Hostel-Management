using Domain.Entities;
using Domain.Entities.Room;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces;
public interface IHostelServices
{
    Task<HostelEntity> GetHostel(RoomEntity room);
    Task<HostelEntity> GetHostel(Guid hostelId);
    Task<HostelEntity> UploadHostelImage(HostelEntity hostel, IFormFile image);
}
