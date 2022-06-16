using Domain.Entities;
using Domain.Entities.Commitment;

namespace Application.Interfaces;

public interface ITenantServices
{
    Task GetIntoRoom(CommitmentEntity commitment, Guid tenantId);
}
