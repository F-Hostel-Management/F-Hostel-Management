﻿using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Room;

namespace Application.Interfaces;

public interface IAuthorizationServices
{
    Task<bool> IsHostelManagedByCurrentUser(Guid hostelId, Guid userId);
    Task<bool> IsRoomManageByCurrentUser(Guid roomId, Guid userId);
    Task<bool> IsHostelManagedByCurrentUser(HostelEntity hostel, Guid userId);
    Task<bool> IsCommitmentManageByCurrentUser(Guid comId, Guid userId);
    //Task<bool> IsFacilityManageByCurrentUser(Guid hostelId, Guid userId),
    Task<bool> IsCurrentUserRentingTheRoom(CommitmentEntity commitment, Guid userId);
    Task<RoomEntity> GetRoomThatManagedByCurrentUser(Guid roomId, Guid userId);
    Task VerifiedRoomsInAHostelThatManagedByCurrentUser(IEnumerable<Guid> roomIds, Guid hostelId, Guid userId);
    Task<HostelEntity> GetHostelThatManagedByCurrentUser(Guid hostelId, Guid userId);
    Task<bool> IsCommitmentStillValid(Guid commitmentId);
}
