using Api.UserFeatures.Responses;
using Application.Interfaces.IRepository;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace Api.Controllers;

public class ODataController : BaseApiController
{
    private readonly IGenericRepository<UserEntity> _userRepository;
    private readonly ApplicationDbContext _context;
    public ODataController(
        IGenericRepository<UserEntity> userRepository, ApplicationDbContext context)
    {
        _userRepository = userRepository;
        _context = context;
    }

    [EnableQuery]
    [HttpGet("demo-odata")]
    public async Task<IActionResult> GetTenantsAsync()
    {
        var tenants = await _userRepository.WhereAsync(e => e.RoleString == Role.Tenant.ToString());
        return Ok(_context.Users);
    }
}
