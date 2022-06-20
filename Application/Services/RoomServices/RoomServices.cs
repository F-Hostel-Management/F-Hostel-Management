using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using AutoWrapper.Wrappers;
using Domain.Entities.Room;
using Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace Application.Services.RoomServices;

public class RoomServices : IRoomServices
{
    private readonly IGenericRepository<RoomEntity> _roomRepository;
    private readonly IHostelServices _hostelServices;
    public RoomServices(
        IGenericRepository<RoomEntity> roomRepository, IHostelServices hostelServices)
    {
        _roomRepository = roomRepository;
        _hostelServices = hostelServices;
    }
    public async Task RentThisRoom(RoomEntity room)
    {
        room.RoomStatus = RoomStatus.Rented;
        await _roomRepository.UpdateAsync(room);
    }

    // return room entity
    // not found ==> throw exception
    public async Task<RoomEntity> GetRoom(Guid Id, RoomStatus status)
    {
        /*RoomEntity room = await _roomRepository
            .FirstOrDefaultAsync(room =>
            room.Id.Equals(Id)
            && room.Status.Equals(status.ToString())
            );*/
        RoomEntity room = await _roomRepository.FindByIdAsync(Id);
        if (room == null || room.RoomStatus != status)
        {
            throw new NotFoundException($"Room not found");
        }
        return room;  
    }

    public async Task<RoomEntity> GetRoom(Guid Id)
    {
        RoomEntity room = await _roomRepository.FindByIdAsync(Id);

        return room ??
            throw new NotFoundException($"Room not found");
    }

    public async Task<bool> HasTenant(Guid roomId, Guid userId)
    {
        var room = (await _roomRepository.WhereAsync(room => room.Id == roomId, new string[] {"RoomTenants"})).FirstOrDefault();
        if (room == null) throw new NotFoundException($"Room not found");

        return room.RoomTenants.Any(roomTenant => roomTenant.TenantId == userId);
    }

    public async Task<bool> HasCommitment(Guid roomId)
    {
        var room = (await _roomRepository.WhereAsync(room => room.Id.Equals(roomId), new string[] { "Commitments" })).FirstOrDefault();
        if (room is null)
        {
            throw new Exception($"Room not found");
        }

        var lastestCommitment = room.Commitments.OrderByDescending(com => com.EndDate).FirstOrDefault();
        if (lastestCommitment == null || lastestCommitment.CommitmentStatus == CommitmentStatus.Expired)
        {
            return false;
        }
        return true;
    }
}
