using Domain.Entities;
using Domain.Entities.Facility;
using Domain.Entities.Hostel;
using Domain.Enums;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers.OData;

[Authorize(Roles = nameof(Role.Owner))]
public class HostelManagementsController:BaseODataController<HostelManagement>
{
    public HostelManagementsController(ApplicationDbContext db) : base(db)
    {
    }
}