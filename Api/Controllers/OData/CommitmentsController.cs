using Domain.Constants;
using Domain.Entities.Commitment;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers.OData;

[Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
public class CommitmentsController : BaseODataController<CommitmentEntity>
{
    public CommitmentsController(ApplicationDbContext db) : base(db)
    {
    }
}
