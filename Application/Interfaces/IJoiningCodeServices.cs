using Domain.Entities.Commitment;

namespace Application.Interfaces;

public interface IJoiningCodeServices
{
    Task<JoiningCode> CreateJoiningCode(JoiningCode joiningCode);
    void ValidateJoiningCode(JoiningCode joiningCode);
    Task<CommitmentEntity> GetCommitment(JoiningCode joiningCode);
    Task<JoiningCode> GetJoiningCode(int digits);
    bool IsValid(JoiningCode joiningCode);
}
