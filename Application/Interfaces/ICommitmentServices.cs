using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Room;

namespace Application.Interfaces
{
    public interface ICommitmentServices
    {
        Task CreateCommitment(CommitmentEntity commitment, RoomEntity room);
        Task<bool> IsExist(string commitmentCode);

        Task<CommitmentEntity> GetCurrentCommitmentByRoom(Guid roomId);
        Task<CommitmentEntity> GetPendingCommitmentByRoom(Guid roomId);
        Task<CommitmentEntity> GetApprovedCommitmentByRoom(Guid roomId);
        Task ApprovedCommitment(CommitmentEntity commitment);
        Task ActivatedCommitment(CommitmentEntity commitment, Guid tenantId);

        // create 6 digit qr code
        Task<CommitmentEntity> GetCommitementById(Guid commitmentId);
        Task<CommitmentEntity> GetNotExpiredCommitmentById(Guid commitmentId);
    }
}
