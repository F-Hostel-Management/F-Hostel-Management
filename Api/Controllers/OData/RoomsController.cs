using Domain.Entities.Room;
using Domain.Enums;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace Api.Controllers.OData;


public class RoomsController : BaseODataController<RoomEntity>
{
    public RoomsController(ApplicationDbContext db) : base(db)
    {
    }

   
}
