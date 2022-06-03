using Application.Interfaces;
using Application.Interfaces.IRepository;
using AutoWrapper.Wrappers;
using Domain.Entities.Commitment;
using Domain.Entities.Room;
using Domain.Enums;
using Microsoft.AspNetCore.Http;

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

    public async Task<CommitmentEntity> GetNotExpiredCommitmentByRoom(Guid roomId)
    {
        CommitmentEntity com = await _commitmentRepository
            .FirstOrDefaultAsync(com =>
            com.RoomId.Equals(roomId)
            && !com.Status.Equals(CommitmentStatus.Expired.ToString())
            );
        return com ??
           throw new ApiException("Commitment Not Found Or Already Expired", StatusCodes.Status404NotFound);
    }

    public async Task<CommitmentEntity> GetCommitment(Guid Id, CommitmentStatus status)
    {
        CommitmentEntity com = await _commitmentRepository
            .FirstOrDefaultAsync(com =>
            com.Id.Equals(Id)
            && com.Status.Equals(status.ToString())
            );
        return com ??
            throw new ApiException("Commitment Not Found", StatusCodes.Status404NotFound);
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

    public async Task CheckDuplicate(string commitmentCode)
    {
        CommitmentEntity com = await _commitmentRepository
            .FirstOrDefaultAsync(com => com.CommitmentCode.Equals(commitmentCode));

        if (com != null)
            throw new ApiException("Duplicated Commitment Code", StatusCodes.Status400BadRequest);
    }

    public async Task<CommitmentEntity> GetCommitment(Guid commitmentId)
    {
        CommitmentEntity com = await _commitmentRepository.FindByIdAsync(commitmentId);
        return com ??
          throw new ApiException("Commitment Not Found Or Already Expired", StatusCodes.Status404NotFound);

    }

    public async Task<CommitmentEntity> GetNotExpiredCommitment(Guid Id)
    {
        CommitmentEntity com = await _commitmentRepository
            .FirstOrDefaultAsync(com =>
            com.Id.Equals(Id)
            && !com.Status.Equals(CommitmentStatus.Expired.ToString())
            );
        return com ??
           throw new ApiException("Commitment Not Found Or Already Expired", StatusCodes.Status404NotFound);
    }

    public async Task UpdatePendingCommitment(CommitmentEntity updatedCommitment)
    {
        await _commitmentRepository.UpdateAsync(updatedCommitment);
    }
}
