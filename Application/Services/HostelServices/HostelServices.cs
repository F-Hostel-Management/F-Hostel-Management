using Application.Interfaces;
using Application.Interfaces.IRepository;
using AutoWrapper.Wrappers;
using Domain.Entities;
using Domain.Entities.Room;
using Microsoft.AspNetCore.Http;

namespace Application.Services.HostelServices;
public class HostelServices : IHostelServices
{
    private readonly IGenericRepository<HostelEntity> _hostelRepository;

    public HostelServices(
        IGenericRepository<HostelEntity> hostelRepository)
    {
        _hostelRepository = hostelRepository;
    }
    public async Task<HostelEntity> GetHostel(RoomEntity room)
    {
        HostelEntity hostel = await _hostelRepository
            .FirstOrDefaultAsync(hostel => hostel.Id.Equals(room.HostelId));
        
        return hostel ??
            throw new ApiException($"Hostel not found", StatusCodes.Status404NotFound);
    }
}
