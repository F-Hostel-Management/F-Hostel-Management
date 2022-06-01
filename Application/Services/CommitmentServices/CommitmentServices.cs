using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Entities.Commitment;
using Domain.Entities.Room;
using Domain.Enums;

namespace Application.Services.CommitmentServices;

public class CommitmentServices : ICommitmentServices
{
    public readonly IGenericRepository<CommitmentEntity> _commitmentRepository;


    public CommitmentServices(
        IGenericRepository<CommitmentEntity> commitmentRepository
        )
    {
        _commitmentRepository = commitmentRepository;
    }

    public async Task CreateCommitment(CommitmentEntity commitment, RoomEntity room)
    {
        commitment.RoomId = room.Id;
        commitment.CommitmentStatus = CommitmentStatus.Pending;
        // save commitment
        await _commitmentRepository.CreateAsync(commitment);
    }

    public async Task<CommitmentEntity> GetCurrentCommitmentByRoom(Guid roomId)
    {
        return await _commitmentRepository
            .FirstOrDefaultAsync(com =>
            com.RoomId.Equals(roomId)
            && !com.Status.Equals(CommitmentStatus.Expired.ToString())
            );
    }

    public async Task<CommitmentEntity> GetPendingCommitmentById(Guid Id)
    {
        return await _commitmentRepository
            .FirstOrDefaultAsync(com =>
            com.Id.Equals(Id)
            && com.Status.Equals(CommitmentStatus.Pending.ToString())
            );
    }
    public async Task<CommitmentEntity> GetApprovedCommitmentById(Guid Id)
    {
        return await _commitmentRepository
            .FirstOrDefaultAsync(com =>
            com.Id.Equals(Id)
            && com.Status.Equals(CommitmentStatus.Approved.ToString())
            );
    }

    public async Task ApprovedCommitment(CommitmentEntity commitment)
    {
        commitment.CommitmentStatus = CommitmentStatus.Approved;
        await _commitmentRepository.UpdateAsync(commitment);
    }
    public async Task ActivatedCommitment(CommitmentEntity commitment, Guid tenantId)
    {
        // There is no main person in the contract
        if (commitment.Tenant == null)
        {
            commitment.TenantId = tenantId;
            commitment.CommitmentStatus = CommitmentStatus.Active;
            await _commitmentRepository.UpdateAsync(commitment);
        }
    }

    public async Task<bool> IsExist(string commitmentCode)
    {
        return await _commitmentRepository
            .FirstOrDefaultAsync(com => com.CommitmentCode.Equals(commitmentCode))
            != null;
    }

    public async Task<CommitmentEntity> GetCommitementById(Guid commitmentId)
    {
        return await _commitmentRepository.FindByIdAsync(commitmentId);
    }

    public async Task<CommitmentEntity> GetNotExpiredCommitmentById(Guid commitmentId)
    {
        return await _commitmentRepository
            .FirstOrDefaultAsync(com =>
            com.Id.Equals(commitmentId)
            && !com.Status.Equals(CommitmentStatus.Expired.ToString())
            );
    }

    public async Task UpdatePendingCommitment(CommitmentEntity updatedCommitment)
    {
        await _commitmentRepository.UpdateAsync(updatedCommitment);
    }
}
