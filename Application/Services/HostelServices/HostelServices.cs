using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Utilities;
using AutoWrapper.Wrappers;
using Domain.Entities;
using Domain.Entities.Hostel;
using Domain.Entities.Room;
using Microsoft.AspNetCore.Http;

namespace Application.Services.HostelServices;
public class HostelServices : IHostelServices
{
    private readonly IGenericRepository<HostelEntity> _hostelRepository;
    private readonly IGenericRepository<HostelManagement> _hostelManagementRepository;
    private readonly ICloudStorage _cloudStorage;

    public HostelServices(
        IGenericRepository<HostelEntity> hostelRepository,
        IGenericRepository<HostelManagement> hostelManagementRepository,
        ICloudStorage cloudStorage)
    {
        _hostelRepository = hostelRepository;
        _hostelManagementRepository = hostelManagementRepository;
        _cloudStorage = cloudStorage;
    }
    public async Task<HostelEntity> GetHostel(RoomEntity room)
    {
        HostelEntity hostel = await _hostelRepository
            .FirstOrDefaultAsync(hostel => hostel.Id.Equals(room.HostelId));
        
        return hostel ??
            throw new ApiException($"Hostel not found", StatusCodes.Status404NotFound);
    }

    public async Task<HostelEntity> GetHostel(Guid hostelId)
    {
        HostelEntity hostel = await _hostelRepository
             .FirstOrDefaultAsync(hostel => hostel.Id.Equals(hostelId));

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

    public async Task<bool> IsHostelManagedBy(HostelEntity hostel, Guid userId)
    {
        if (hostel.OwnerId.Equals(userId))
        {
            return true;
        }
        var manager = await _hostelManagementRepository.FirstOrDefaultAsync(e =>
                        e.ManagerId.Equals(userId) && e.HostelId.Equals(hostel.Id));

        return manager != null;
    }

    public async Task<HostelEntity> HostelManagedBy(Guid hostelID, Guid userID)
    {
        var hostel = (await _hostelRepository.WhereAsync(e =>
             (e.HostelManagements.FirstOrDefault(e => e.ManagerId.Equals(userID)) != null ||
              e.OwnerId.Equals(userID)) && e.Id.Equals(hostelID)
             , "HostelManagements", "HostelCategory", "Owner", "Rooms", "Commitments"));

        if (hostel.Count == 1)
            return hostel.First();
        else
            throw new ApiException("Forbid", StatusCodes.Status403Forbidden);
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
