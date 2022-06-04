using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Utilities;
using AutoWrapper.Wrappers;
using Domain.Entities;
using Domain.Entities.Room;
using Microsoft.AspNetCore.Http;

namespace Application.Services.HostelServices;
public class HostelServices : IHostelServices
{
    private readonly IGenericRepository<HostelEntity> _hostelRepository;
    private readonly ICloudStorage _cloudStorage;

    public HostelServices(
        IGenericRepository<HostelEntity> hostelRepository, ICloudStorage cloudStorage)
    {
        _hostelRepository = hostelRepository;
        _cloudStorage = cloudStorage;
    }
    public async Task<HostelEntity> GetHostel(RoomEntity room)
    {
        HostelEntity hostel = await _hostelRepository
            .FirstOrDefaultAsync(hostel => hostel.Id.Equals(room.HostelId));
        
        return hostel ??
            throw new ApiException($"Hostel not found", StatusCodes.Status404NotFound);
    }

    public async Task<bool> IsHostelManagedBy(Guid hostelID, Guid userID)
    {
       var list = await _hostelRepository.WhereAsync(e => 
            (e.HostelManagements.FirstOrDefault(e => e.ManagerId.Equals(userID)) != null || 
             e.OwnerId.Equals(userID)) && e.Id.Equals(hostelID)
            ,"HostelManagements");
        return list.Count == 1;
    }

    public async Task<HostelEntity> UploadHostelImage(HostelEntity hostel, IFormFile image)
    {
        if (!string.IsNullOrEmpty(hostel.ImgPath))
        {
            await _cloudStorage.DeleteFileAsync(hostel.ImgPath);
        }
        string fileNameForStorage = FilePathUtil.FormFileName($"hostel_{hostel.Id}", image.FileName);
        await _cloudStorage.UploadFileAsync(image, fileNameForStorage);
        hostel.ImgPath = fileNameForStorage;
        await _hostelRepository.UpdateAsync(hostel);
        return hostel;
    }
}
