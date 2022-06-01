using Domain.Enums;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace Api.Controllers.OData;

public class CommitmentsController : BaseODataController
{

    [EnableQuery]
    [HttpGet("{comId}")]
    public async Task<IActionResult> GetCommitmentAsync([FromRoute] Guid comId)
    {

        var com = await DbContext.Commitments.FindAsync(comId);
        return Ok(com);
    }
}
