using Api.UserFeatures.Attributes;
using Application.Interfaces;
using AutoMapper;
using AutoWrapper.Filters;
using Domain.Entities;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Api.Controllers;

[ApiController]
[Route("server/odata/[controller]")]
// [AutoWrapIgnore]
[Authorize]
public class BaseODataController<T> : ODataController where T : class
{
    private IMapper _mapper;
    protected IMapper Mapper => _mapper ??= HttpContext.RequestServices.GetService<IMapper>();
    protected ApplicationDbContext db;

    public BaseODataController(ApplicationDbContext db)
    {
        this.db = db;
    }
    protected UserEntity CurrentUser => db.Users.FirstOrDefault(e => e.Id.Equals(GetUserID()));
    protected Guid CurrentUserId => GetUserID();

    protected Guid GetUserID()
    {
        var userID = HttpContext.User.Claims.FirstOrDefault(a => a.Type == "id");
        if (userID is null)
        {
            return Guid.Empty;
        }
        return new Guid(userID.Value);
    }
    protected virtual IQueryable<T> GetQuery()
    {
        return db.Set<T>();
    }

    [HttpGet("")]
    // [ApiExplorerSettings(IgnoreApi = true)]
    public virtual IQueryable GetData(ODataQueryOptions<T> options)
    {
        return ApplyQuery(options, GetQuery());
    }

    protected IQueryable ApplyQuery<K>(ODataQueryOptions<K> options, IQueryable<K> query)
    {
        return options.ApplyTo(query);
    }
}
