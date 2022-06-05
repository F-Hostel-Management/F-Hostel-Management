using Domain.Constants;
using Domain.Entities.Room;
using Domain.Entities.User;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace Api.Controllers.OData;

[Authorize]
public class RoomsController : BaseODataController<RoomEntity>
{
    public RoomsController(ApplicationDbContext db) : base(db)
    {
    }
}
