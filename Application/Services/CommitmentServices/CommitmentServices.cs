using Application.Exceptions;
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

    public async Task CreateCommitment(CommitmentEntity commitment)
    {
        commitment.CommitmentStatus = CommitmentStatus.Pending;
        await _commitmentRepository.CreateAsync(commitment);
    }

    public async Task<CommitmentEntity> GetNotExpiredCommitmentByRoom(Guid roomId)
    {
        CommitmentEntity com = await _commitmentRepository
            .FirstOrDefaultAsync(com =>
            com.RoomId.Equals(roomId)
            && !com.Status.Equals(CommitmentStatus.Expired.ToString())
            );
        return com ??
           throw new NotFoundException("Commitment Not Found Or Already Expired");
    }

    public async Task<IList<CommitmentEntity>> GetCommitmentsForTenant(Guid roomId, Guid tenantId)
    {

        var coms = await _commitmentRepository.WhereAsync(com =>
            com.RoomTenants.Where(rt =>
            rt.TenantId.Equals(tenantId) && rt.RoomId.Equals(roomId)).Any(), "RoomTenants");
        return coms;
    }

    public async Task ApprovedCommitment(CommitmentEntity commitment)
    {
        commitment.CommitmentStatus = CommitmentStatus.Approved;
        await _commitmentRepository.UpdateAsync(commitment);
    }
    public async Task ActivatedCommitment(CommitmentEntity commitment)
    {
        commitment.CommitmentStatus = CommitmentStatus.Active;
        commitment.CanModify = false;
        await _commitmentRepository.UpdateAsync(commitment);
    }

    public async Task<CommitmentEntity> GetCommitment(Guid commitmentId)
    {
        CommitmentEntity com = await _commitmentRepository.FindByIdAsync(commitmentId);
        return com ??
          throw new NotFoundException("Commitment Not Found Or Already Expired");

    }

    public async Task<CommitmentEntity> GetNotExpiredCommitment(Guid Id)
    {
        CommitmentEntity com = await _commitmentRepository
            .FirstOrDefaultAsync(com =>
            com.Id.Equals(Id)
            && !com.Status.Equals(CommitmentStatus.Expired.ToString())
            );
        return com ??
           throw new NotFoundException("Commitment Not Found Or Already Expired");
    }

    public async Task<CommitmentEntity> GetApprovedOrActiveCommitment(Guid Id)
    {
        CommitmentEntity com = await _commitmentRepository
            .FirstOrDefaultAsync(com =>
            com.Id.Equals(Id)
            && (com.Status.Equals(CommitmentStatus.Active.ToString()) ||
                com.Status.Equals(CommitmentStatus.Approved.ToString()))
            );
        return com ??
           throw new NotFoundException("Commitment Not Found Or Already Expired");
    }

    public async Task UpdatePendingCommitment(CommitmentEntity updatedCommitment)
    {
        await _commitmentRepository.UpdateAsync(updatedCommitment);
    }

    public async Task<CommitmentEntity> GetCommitment(Guid Id, CommitmentStatus status)
    {
        CommitmentEntity com = await _commitmentRepository
            .FirstOrDefaultAsync(com =>
            com.Id.Equals(Id)
            && com.Status.Equals(status.ToString())
            );
        return com ??
            throw new NotFoundException("Commitment Not Found");
    }

    public async Task<int> CountCommitmentByHostel(Guid hostelId)
    {
        var list = await _commitmentRepository.WhereAsync(com =>
        com.HostelId.Equals(hostelId));
        return list.Count;
    }

    public async Task<CommitmentEntity> GetLatestCommitmentByRoom(Guid roomId)
    {
        var commitments = (await _commitmentRepository.WhereAsync(c =>
            c.RoomId.Equals(roomId))).OrderByDescending(com => com.EndDate);

        if (!commitments.Any())
        {
            throw new NotFoundException("Commitment not found");
        }
        return commitments.First();
    }
}
