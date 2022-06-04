using Domain.Constants;
using Domain.Entities.Commitment;
using Domain.Enums;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace Api.Controllers.OData;

[Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
public class CommitmentsController : BaseODataController<CommitmentEntity>
{
    public CommitmentsController(ApplicationDbContext db) : base(db)
    {
    }

    // owner manager view commitment list of hostel
    [ApiExplorerSettings(IgnoreApi = true)]
    [HttpGet("get-commitments-by-hostel/{hostelId}")]
    public IQueryable GetCommitmentsListOfHostel
        (ODataQueryOptions<CommitmentEntity> options, Guid hostelId)
    {
        var query = db.Commitments
            .Where(com => com.Room.HostelId.Equals(hostelId));
        return ApplyQuery(options, query);
    }


    // owner manager view commitment list of room
    [ApiExplorerSettings(IgnoreApi = true)]
    [HttpGet("get-commitments-by-room/{roomId}")]
    public IQueryable GetCommitmentsListOfRoom
        (ODataQueryOptions<CommitmentEntity> options, Guid roomId)
    {
        var query = db.Commitments
            .Where(com => com.RoomId.Equals(roomId));
        return ApplyQuery(options, query);
    }
}
