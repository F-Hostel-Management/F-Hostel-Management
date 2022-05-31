using Domain.Enums;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace Api.Controllers.OData;

public class ODataTestterController : BaseODataController
{
    private readonly ApplicationDbContext _context;
    public ODataTestterController(
        ApplicationDbContext context)
    {
        _context = context;
    }

    [EnableQuery]
    [HttpGet("tenants")]
    public IActionResult GetTenantsAsync()
    {
        var users = _context.Users
            .Where(u => u.RoleString == Role.Tenant.ToString());

        return Ok(users);
    }

    [EnableQuery]
    [HttpGet("owners")]
    public IActionResult GetOwnersAsync()
    {
        var users = _context.Users
            .Where(u => u.RoleString == Role.Owner.ToString());

        return Ok(users);
    }
}
