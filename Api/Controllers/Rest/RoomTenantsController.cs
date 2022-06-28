using Application.Exceptions;
using Application.Interfaces.IRepository;
using Domain.Constants;
using Domain.Entities.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest;

public class RoomTenantsController : BaseRestController
{
    private readonly IGenericRepository<RoomTenant> _roomTenantRepository;

    public RoomTenantsController(IGenericRepository<RoomTenant> roomTenantRepository)
    {
        _roomTenantRepository = roomTenantRepository;
    }

    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpDelete("{id}")]
    public async Task<IActionResult> KickAsync(Guid id)
    {
        var roomTenant = await _roomTenantRepository.FindByIdAsync(id);
        if (roomTenant == null) throw new NotFoundException("Room tenant not found");

        await _roomTenantRepository.DeleteSoftAsync(roomTenant);

        return Ok();
    }
}
