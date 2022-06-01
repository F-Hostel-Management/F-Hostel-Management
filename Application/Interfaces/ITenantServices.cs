using Domain.Entities;
using Domain.Entities.Commitment;

namespace Application.Interfaces;

public interface ITenantServices
{
    Task GetIntoRoom(CommitmentEntity commitment, UserEntity tenant);
    Task<UserEntity> GetTenant(Guid tenantId);
}
