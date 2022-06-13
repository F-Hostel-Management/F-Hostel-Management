using Api.UserFeatures.Requests;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Constants;
using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Room;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest;

public class CommitmentsController : BaseRestController
{
    private readonly IHostelServices _hostelServices;
    private readonly ICommitmentServices _commitmentServices;
    private readonly IRoomServices _roomServices;
    private readonly ITenantServices _tenantServices;
    private readonly IJoiningCodeServices _joiningCodeServices;
    private readonly IAuthorizationServices _authorServices;
    private readonly IGenericRepository<CommitmentEntity> _commitmentRepository;


    public CommitmentsController(
        IHostelServices hostelServices,
        ICommitmentServices commitmentServices,
        IJoiningCodeServices joiningCodeServices,
        IRoomServices roomServices,
        ITenantServices tenantServices,
        IAuthorizationServices authorServices,
        IGenericRepository<CommitmentEntity> commitmentRepository)
    {
        _tenantServices = tenantServices;
        _hostelServices = hostelServices;
        _joiningCodeServices = joiningCodeServices;
        _commitmentServices = commitmentServices;
        _roomServices = roomServices;
        _authorServices = authorServices;
        _commitmentRepository = commitmentRepository;
    }
    /// <summary>
    /// owner || manager create a commitment of room |
    /// commitment status ==> pending |
    /// room status ==> rent
    /// </summary>
    /// <param name="comReq"></param>
    /// <returns></returns>
    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPost]
    public async Task<IActionResult> CreateCommitment(CreateCommitmentRequest comReq)
    {

        // get available room
        RoomEntity room = await _roomServices
            .GetRoom(comReq.RoomId, RoomStatus.Available);

        // check hostel owner and owner in room commitment request
        HostelEntity hostel = await _hostelServices.GetHostel(room);

        bool isManagedByCurrentUser = await _authorServices.IsHostelManagedByCurrentUser(hostel, CurrentUserID);

        if (!isManagedByCurrentUser)
        {
            return Unauthorized();
        }

        // call service
        CommitmentEntity com = Mapper.Map<CommitmentEntity>(comReq);

        if (CurrentUserRole.Equals(Role.Manager.ToString()))
        {
            com.ManagerId = CurrentUserID;
        }
        com.OwnerId = hostel.OwnerId;
        com.HostelId = hostel.Id;
        com.CreatedDate = DateTime.Now;
        int code = (await _commitmentServices.CountForHostel(com.HostelId) + 1);
        com.CommitmentCode = "F-" + code;

        await _commitmentServices.CreateCommitment(com, room);

        // update room status
        await _roomServices.Rent(room);

        return Ok(com.Id);
    }

    /// <summary>
    /// owner approve the commitment |
    /// commitment status ==> approved
    /// </summary>
    /// <param name="req"></param>
    /// <returns></returns>
    [Authorize(Roles = nameof(Role.Owner))]
    [HttpPatch("owner-approved-commitment/status")]
    public async Task<IActionResult> OwnerApprovedCommitment
        ([FromBody] OwnerApprovedCommitmentRequest req)
    {
        // get pending commitment
        CommitmentEntity com =
            await _commitmentServices.GetCommitment
            (req.CommitmentId, CommitmentStatus.Pending);

        await _commitmentServices.ApprovedCommitment(com);
        return Ok();
    }


    // commitment expired ==> com.status => expired => remove all invoice schedules

    /// <summary>
    /// owner || manager create a joining code for approved, active commitment
    /// </summary>
    /// <param name="req"></param>
    /// <returns></returns>
    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPost("joiningCode")]
    public async Task<IActionResult> CreateJoiningCode
        ([FromBody] CreateJoiningCodeRequest req)
    {
        // check exist and not expired commitment
        CommitmentEntity com = await _commitmentServices.GetApprovedOrActiveCommitment(req.CommitmentId);
        bool isManaged = await _authorServices.IsHostelManagedByCurrentUser(com.HostelId, CurrentUserID);
        if (!isManaged)
        {
            return Forbid();
        }

        JoiningCode joiningCode = Mapper.Map<JoiningCode>(req);
        var response = await _joiningCodeServices.CreateJoiningCode(joiningCode);
        return Ok(response);
    }

    /// <summary>
    /// tenant using qr to get commitment
    /// </summary>
    /// <param name="SixDigitsCode"></param>
    /// <returns></returns>
    [AllowAnonymous]
    [HttpGet("get-commitment-by-joiningCode/{SixDigitsCode}")]
    public async Task<IActionResult> GetCommitmentUsingJoiningCode([FromRoute] int SixDigitsCode)
    {
        // validate joining code
        JoiningCode joiningCode = await _joiningCodeServices.GetJoiningCode(SixDigitsCode);
        _joiningCodeServices.ValidateJoiningCode(joiningCode);

        CommitmentEntity commitment = await _joiningCodeServices.GetCommitment(joiningCode);
        return Ok(commitment);
    }

    /// <summary>
    /// tenant activate commitment
    /// </summary>
    /// <param name="req"></param>
    /// <returns></returns>
    [Authorize(Roles = nameof(Role.Tenant))]
    [HttpPatch("tenant-activate-commitment/status")]
    public async Task<IActionResult> TenantDoneCommitment
    ([FromBody] TenantDoneCommitmentRequest req)
    {
        // validate joining code
        JoiningCode joiningCode = await _joiningCodeServices.
            GetJoiningCode(req.SixDigitsJoiningCode);
        _joiningCodeServices.ValidateJoiningCode(joiningCode);

        CommitmentEntity com =
            await _joiningCodeServices.GetCommitment(joiningCode);

        // activate commitment
        await _commitmentServices.ActivatedCommitment(com, CurrentUserID);

        // get into room
        await _tenantServices.GetIntoRoom(com, CurrentUserID);
        return Ok(com);
    }

    /// <summary>
    /// owner || manager update pending commitment
    /// </summary>
    /// <param name="comId"></param>
    /// <param name="uComReq"></param>
    /// <returns></returns>
    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPatch("{comId}")]
    public async Task<IActionResult> UpdatePendingCommitment([FromRoute] Guid comId, UpdateCommitmentRequest uComReq)
    {
        CommitmentEntity pendingCom = await _commitmentServices.GetCommitment(comId, CommitmentStatus.Pending);
        CommitmentEntity updatedCommitment = Mapper.Map(uComReq, pendingCom);
        if (CurrentUserRole.Equals(Role.Manager.ToString()))
        {
            updatedCommitment.ManagerId = CurrentUserID;
        }
        await _commitmentServices.UpdatePendingCommitment(updatedCommitment);
        return Ok();
    }

/*    [Authorize(Roles = nameof(Role.Owner))]
    [HttpDelete("{comId}")]
    public async Task<IActionResult> DeleteCommitment([FromRoute] Guid comId)
    {
        var com = await _commitmentServices.GetCommitment(comId);
        if (com.CommitmentStatus == CommitmentStatus.Active || com.CommitmentStatus == CommitmentStatus.Expired)
        {
            return BadRequest();
        }
        if (com.CommitmentStatus == CommitmentStatus.Pending)
        {
            com.IsDeleted = true;
            await _commitmentRepository.UpdateAsync(com);
            return Ok();
        }
        else
        {
            //if ()
        }*/



    }
}
