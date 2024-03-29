﻿using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Utilities;
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
            throw new NotFoundException($"Hostel not found");
    }

    public async Task<HostelEntity> GetHostel(Guid hostelId)
    {
        HostelEntity hostel = await _hostelRepository
             .FirstOrDefaultAsync(hostel => hostel.Id.Equals(hostelId));

        return hostel ??
            throw new NotFoundException($"Hostel not found");
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
