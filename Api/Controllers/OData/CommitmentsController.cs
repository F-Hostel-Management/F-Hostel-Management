using Domain.Entities.Commitment;
using Domain.Enums;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers.OData;

public class CommitmentsController : BaseODataController<CommitmentEntity>
{

    //[EnableQuery]
    //[HttpGet("{comId}")]
    //public async Task<IActionResult> GetCommitmentAsync([FromRoute] Guid comId)
    //{

    //    var com = await DbContext.Commitments.FindAsync(comId);
    //    return Ok(com);
    //}
    public CommitmentsController(ApplicationDbContext db) : base(db)
    {
    }
}
