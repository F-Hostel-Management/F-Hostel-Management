using Domain.Entities;
using Domain.Entities.Room;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.OData;


public class OdataHostelsController : BaseODataController
{
    private readonly ApplicationDbContext _context;
    public OdataHostelsController(
        ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("hostels")]
    public IActionResult GetHotels()
    {
        return Ok(_context.Hostels);
    }
}
