using Domain.Enums;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace Api.Controllers.OData;

public class OdataCommitmentsController : BaseODataController
{
    private readonly ApplicationDbContext _context;
    public OdataCommitmentsController(
        ApplicationDbContext context)
    {
        _context = context;
    }

    [EnableQuery]
    [HttpGet("rooms/{RoomId}/commitment")]
    public IActionResult GetCurrentCommitmentByRoom([FromRoute] Guid RoomId)
    {

        var com = _context.Commitments.FirstOrDefault(com =>
                    com.RoomId == RoomId
                    && !com.Status.Equals(CommitmentStatus.Expired.ToString()));
        return Ok(com);
    }

    [EnableQuery]
    [HttpGet("hostels/{HostelId}/commitments")]
    public IActionResult GetCommitmentsByHostel([FromRoute] Guid HostelId)
    {

        var coms = _context.Commitments.Where(com =>
                    com.Room.HostelId.Equals(HostelId)
                    );
        return Ok(coms);
    }

    [EnableQuery]
    [HttpGet("commitments/{ComId}")]
    public async Task<IActionResult> GetCommitmentAsync([FromRoute] Guid ComId)
    {

        var com = await _context.Commitments.FindAsync(ComId);
        return Ok(com);
    }
}
