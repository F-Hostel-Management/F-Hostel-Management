﻿using Domain.Entities;

namespace Application.Interfaces;

public interface IAuthorizationServices
{
    Task<bool> IsHostelManagedByCurrentUser(Guid hostelId, Guid userId);
    Task<bool> IsRoomManageByCurrentUser(Guid roomId, Guid userId);
    Task<bool> IsHostelManagedByCurrentUser(HostelEntity hostel, Guid userId);
    Task<bool> IsCommitmentManageByCurrentUser(Guid comId, Guid userId);
    //Task<bool> IsFacilityManageByCurrentUser(Guid hostelId, Guid userId),

}