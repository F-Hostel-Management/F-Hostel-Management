using Domain.Entities.Commitment;
using Domain.Enums;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers.OData;

public class CommitmentsController : BaseODataController<CommitmentEntity>
{
    public CommitmentsController(ApplicationDbContext db) : base(db)
    {
    }

    //[Authorize(nameof(Role.Tenant))]
    //public IQueryable GetCommitmentByTenant(ODataQueryOptions<CommitmentEntity> options)
    //{
    //    //var query = db.Commitments.Where(e)
    //    //return ApplyQuery(options, )
    //    return null;
    //}
}
