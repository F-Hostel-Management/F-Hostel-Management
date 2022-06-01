using Domain.Entities;
using Domain.Entities.Commitment;

namespace Application.Interfaces;

public interface ITenantServices
{
    Task<bool> GetIntoRoom(Guid roomId, Guid tenantId);
    Task<UserEntity> GetTenant(Guid tenantId);
}
