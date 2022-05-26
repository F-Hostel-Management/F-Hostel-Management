using Api.UserFeatures.Responses;
using Application.Interfaces.IRepository;
using Domain.Entities;
using Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace Api.Controllers;

public class ODataController : BaseApiController
{
    private readonly IGenericRepository<UserEntity> _userRepository;
    public ODataController(
        IGenericRepository<UserEntity> userRepository)
    {
        _userRepository = userRepository;
    }

    [EnableQuery]
    [HttpGet("demo-odata")]
    public async Task<IActionResult> GetTenantsAsync()
    {
        var tenants = await _userRepository.WhereAsync(e => e.RoleString == Role.Tenant.ToString());
        return Ok(tenants);
    }
}
