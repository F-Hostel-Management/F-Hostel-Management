using Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace Api.Controllers.OData;


public class RoomsController : BaseODataController
{
    [EnableQuery]
    [HttpGet("{roomId}/get-current-commitment")]
    public IActionResult GetCurrentCommitmentByRoom([FromRoute] Guid roomId)
    {

        var com = DbContext.Commitments.FirstOrDefault(com =>
                    com.RoomId.Equals(roomId)
                    && !com.Status.Equals(CommitmentStatus.Expired.ToString()));
        return Ok(com);
    }

    [EnableQuery]
    [HttpGet("{roomId}/get-all-commitments-of-room")]
    public IActionResult GetCurrentCommitmentsByRoom([FromRoute] Guid roomId)
    {

        var res = DbContext.Commitments.Where(com =>
                    com.RoomId.Equals(roomId)
                    );
        return Ok(res);
    }
}
