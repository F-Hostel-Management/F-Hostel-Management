using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseApiController : ControllerBase
{
    private IMapper _mapper;
    protected IMapper Mapper => _mapper ??= HttpContext.RequestServices.GetService<IMapper>();


    //private Guid _userID;
    //protected Guid UserID => _userID ??= HttpContext.User.Claims.FirstOrDefault(a => a.Type == "id")?.Value;
}
