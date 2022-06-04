using Api.UserFeatures.Requests;
using Application.Interfaces;
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


    public CommitmentsController(
        IHostelServices hostelServices,
        ICommitmentServices commitmentServices,
        IJoiningCodeServices joiningCodeServices,
        IRoomServices roomServices,
        ITenantServices tenantServices)
    {
        _tenantServices = tenantServices;
        _hostelServices = hostelServices;
        _joiningCodeServices = joiningCodeServices;
        _commitmentServices = commitmentServices;
        _roomServices = roomServices;
    }

    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPost]
    public async Task<IActionResult> CreateCommitment(CreateCommitmentRequest comReq)
    {

        // get available room
        RoomEntity room = await _roomServices
            .GetRoom(comReq.RoomId, RoomStatus.Available);

        // check hostel owner and owner in room commitment request
        HostelEntity hostel = await _hostelServices.GetHostel(room);

        bool isManagedByCurrentUser = await _hostelServices.IsHostelManagedBy(hostel, CurrentUserID);

        if (!isManagedByCurrentUser)
        {
            return Unauthorized();
        }

        // continue of throw exception
        await _commitmentServices.CheckDuplicate(comReq.CommitmentCode);

        // call service
        CommitmentEntity com = Mapper.Map<CommitmentEntity>(comReq);

        if (CurrentUserRole.Equals(Role.Manager.ToString()))
        {
            com.ManagerId = CurrentUserID;
        }
        com.OwnerId = hostel.OwnerId;

        await _commitmentServices.CreateCommitment(com, room);

        // update room status
        await _roomServices.Rent(room);

        return Ok(com);
    }

    // owner conform commitment ==> com.status => approved
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

    // create joining code
    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPost("joiningCode")]
    public async Task<IActionResult> CreateJoiningCode
        ([FromBody] CreateJoiningCodeRequest req)
    {
        // check exist and not expired commitment
        CommitmentEntity com = await _commitmentServices.GetNotExpiredCommitment(req.CommitementId);
        //await _hostelServices.IsHostelManagedBy(com.RoomId, CurrentUserID);

        JoiningCode joiningCode = Mapper.Map<JoiningCode>(req);
        var response = await _joiningCodeServices.CreateJoiningCode(joiningCode);
        return Ok(response);
    }

    // get commitment by joining code
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

    // tenant into commitment ==> com.status => done
    [Authorize(Roles = nameof(Role.Tenant))]
    [HttpPatch("tenant-done-commitment/status")]
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
       await _tenantServices.GetIntoRoom(com.RoomId, CurrentUserID);
        return Ok(com);
    }

    // update pending commitment
    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPatch("{comId}")]
    public async Task<IActionResult> UpdatePendingCommitment([FromRoute] Guid comId, UpdateCommitmentRequest uComReq)
    {
        CommitmentEntity pendingCom = await _commitmentServices.GetCommitment(comId, CommitmentStatus.Pending);
        CommitmentEntity updatedCommitment = Mapper.Map(uComReq, pendingCom);
        await _commitmentServices.UpdatePendingCommitment(updatedCommitment);
        return Ok();
    }

    // get commitment details for tenant
    [Authorize(Roles = nameof(Role.Tenant))]
    [HttpGet("{comId}/get-commitment-details/{tenantId}")]
    public async Task<IActionResult> GetCommitmentDetailsForTenant
        ([FromRoute] Guid comId)
    {
        CommitmentEntity com = await _commitmentServices.GetCommitment(comId);

        _commitmentServices.ValidateTenant(com, CurrentUserID);

        return Ok(com);
    }

}
