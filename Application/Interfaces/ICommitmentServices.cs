﻿using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Room;
using Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface ICommitmentServices
    {
        Task CreateCommitment(CommitmentEntity commitment);
        Task<IList<CommitmentEntity>> GetCommitmentsForTenant(Guid roomId, Guid tenantId);
        Task<CommitmentEntity> GetCommitment(Guid Id);
        Task<CommitmentEntity> GetCommitment(Guid Id, CommitmentStatus status);
        Task<CommitmentEntity> GetNotExpiredCommitmentByRoom(Guid roomId);
        Task<CommitmentEntity> GetLatestCommitmentByRoom(Guid roomId);
        Task<int> CountCommitmentByHostel(Guid hostelId);
        Task<ICollection<CommitmentImages>> UploadCommitment(CommitmentEntity commitment, List<IFormFile> imgFormFiles);
        Task DeleteCommitmentImage(CommitmentImages target);
    }
}
