using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Domain.Entities;

namespace Api.Controllers;

[ApiController]
[Route("server/api/[controller]")]
public abstract class BaseRestController : ControllerBase
{
    private IMapper _mapper;
    protected IMapper Mapper => _mapper ??= HttpContext.RequestServices.GetService<IMapper>();
    protected Guid CurrentUserID => GetUserID();

    protected string CurrentUserRole => GetUserRole();
  
    protected Guid GetUserID()
    {
        var userID = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "id");
        if (userID is null)
        {
            return Guid.Empty;
        }
        return new Guid(userID.Value);
    }

    protected string GetUserRole()
    {
        var role = HttpContext.User.Claims.FirstOrDefault(a => a.Type == ClaimTypes.Role);
        return role.Value;
    }
}
