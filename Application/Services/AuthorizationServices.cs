using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using AutoWrapper.Wrappers;
using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Hostel;
using Domain.Entities.Room;
using Domain.Entities.User;
using Microsoft.AspNetCore.Http;

namespace Application.Services;

public class AuthorizationServices : IAuthorizationServices
{

    private readonly IGenericRepository<HostelEntity> _hostelRepository;
    private readonly IGenericRepository<HostelManagement> _hostelManagementRepository;
    private readonly IGenericRepository<RoomEntity> _roomRepository;
    private readonly IGenericRepository<CommitmentEntity> _commitmentRepository;
    private readonly IGenericRepository<RoomTenant> _roomTenantRepository;
    public AuthorizationServices(
        IGenericRepository<HostelEntity> hostelRepository,
        IGenericRepository<HostelManagement> hostelManagementRepository,
        IGenericRepository<RoomEntity> roomRepository, 
        IGenericRepository<CommitmentEntity> commitmentRepository,
        IGenericRepository<RoomTenant> roomTenantRepository)
    {
        _hostelRepository = hostelRepository;
        _hostelManagementRepository = hostelManagementRepository;
        _roomRepository = roomRepository;
        _commitmentRepository = commitmentRepository;
        _roomTenantRepository = roomTenantRepository;
    }

    public Task<bool> IsCommitmentManageByCurrentUser(Guid comId, Guid userId)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> IsCurrentUserRentTheRoom(Guid roomId, Guid userId)
    {
        var res = await _roomTenantRepository.WhereAsync(rt =>
         rt.RoomId.Equals(roomId) && rt.TenantId.Equals(userId));
        return res.Any();
    }

    public async Task<bool> IsHostelManagedByCurrentUser(Guid hostelId, Guid userId)
    {
        var list = await _hostelRepository.WhereAsync(e =>
            (e.HostelManagements.FirstOrDefault(e => e.ManagerId.Equals(userId)) != null ||
             e.OwnerId.Equals(userId)) && e.Id.Equals(hostelId)
            , "HostelManagements");
        return list.Count == 1;
    }


    public async Task<bool> IsHostelManagedByCurrentUser(HostelEntity hostel, Guid userId)
    {
        if (hostel.OwnerId.Equals(userId))
        {
            return true;
        }
        var manager = await _hostelManagementRepository.FirstOrDefaultAsync(e =>
                        e.ManagerId.Equals(userId) && e.HostelId.Equals(hostel.Id));

        return manager != null;
    }

    public async Task<bool> IsRoomManageByCurrentUser(Guid roomId, Guid userId)
    {
        var room = await _roomRepository.FindByIdAsync(roomId);
        if (room == null) throw new NotFoundException($"Room not found");

        Guid hostelId = room.HostelId;
        return await this.IsHostelManagedByCurrentUser(hostelId, userId);
    }

    public async Task<RoomEntity> RoomThatManageByCurrentUser(Guid roomId, Guid userId)
    {
        var room = await _roomRepository.FindByIdAsync(roomId);
        if (room == null) throw new NotFoundException($"Room not found");
        bool isManaged = await this.IsHostelManagedByCurrentUser(room.HostelId, userId);
        if (!isManaged)
        {
            return null;
        }
        return room;
    }
}
