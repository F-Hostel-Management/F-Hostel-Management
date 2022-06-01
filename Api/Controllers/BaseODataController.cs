using Application.Interfaces;
using AutoMapper;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace Api.Controllers;

[ApiController]
[Route("odata/[controller]")]
public class BaseODataController : ODataController
{
    private IMapper _mapper;
    protected IMapper Mapper => _mapper ??= HttpContext.RequestServices.GetService<IMapper>();


    private IApplicationDbContext _context;
    protected IApplicationDbContext DbContext => _context ??= HttpContext.RequestServices.GetService<IApplicationDbContext>();

    protected Guid GetUserID()
    {
        var userID = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "id");
        if (userID is null)
        {
            return Guid.Empty;
        }
        return new Guid(userID.Value);
    }
}
