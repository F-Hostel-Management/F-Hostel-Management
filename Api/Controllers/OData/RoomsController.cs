using Domain.Enums;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers.OData;


public class RoomsController : BaseODataController
{
    [EnableQuery]
    [HttpGet("{roomId}/get-current-commitment")]
    public IActionResult GetCurrentCommitmentByRoom([FromRoute] Guid roomId)
    {

        var com = DbContext.Commitments.FirstOrDefault(com =>
                    com.RoomId == roomId
                    && !com.Status.Equals(CommitmentStatus.Expired.ToString()));
        return Ok(com);
    }
}
