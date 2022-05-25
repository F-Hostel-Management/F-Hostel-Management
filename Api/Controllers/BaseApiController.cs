using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseApiController : ControllerBase
{
    private IMapper _mapper;
    protected IMapper Mapper => _mapper ??= HttpContext.RequestServices.GetService<IMapper>();


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
