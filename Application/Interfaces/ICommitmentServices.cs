using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Room;
using Domain.Enums;

namespace Application.Interfaces
{
    public interface ICommitmentServices
    {
        Task CreateCommitment(CommitmentEntity commitment, RoomEntity room);
        Task<IList<CommitmentEntity>> GetCommitmentsForTenant(Guid roomId, Guid tenantId);
        Task<CommitmentEntity> GetCommitment(Guid Id);
        Task<CommitmentEntity> GetCommitment(Guid Id, CommitmentStatus status);
        Task<CommitmentEntity> GetApprovedOrActiveCommitment(Guid Id);
        Task<CommitmentEntity> GetNotExpiredCommitment(Guid Id);
        Task<CommitmentEntity> GetNotExpiredCommitmentByRoom(Guid roomId);
        Task ApprovedCommitment(CommitmentEntity commitment);
        Task ActivatedCommitment(CommitmentEntity commitment, Guid tenantId);
        Task UpdatePendingCommitment(CommitmentEntity updatedCommitment);
        Task<int> CountForHostel(Guid hostelId);

    }
}
