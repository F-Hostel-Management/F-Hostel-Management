using Domain.Entities.Commitment;
using Domain.Entities.Room;

namespace Application.Interfaces
{
    public interface ICommitmentServices
    {
        Task CreateCommitment(CommitmentEntity commitment, RoomEntity room);
        Task<bool> IsDuplicated(string commitmentCode);
    }
}
