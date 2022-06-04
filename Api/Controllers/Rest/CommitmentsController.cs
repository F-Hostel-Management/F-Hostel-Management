using Api.UserFeatures.Requests;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using AutoWrapper.Wrappers;
using Domain.Entities;
using Domain.Entities.Commitment;
using Domain.Entities.Room;
using Domain.Enums;
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

    [HttpPost]
    public async Task<IActionResult> CreateCommitment(CreateCommitmentRequest comReq)
    {

        // get available room
        RoomEntity room = await _roomServices
            .GetRoom(comReq.RoomId, RoomStatus.Available);

        // check hostel owner and owner in room commitment request
        HostelEntity hostel = await _hostelServices.GetHostel(room);

        if (!comReq.OwnerId.Equals(hostel.OwnerId))
        {
            throw new ApiException("Unauthorized", StatusCodes.Status401Unauthorized);
        }

        // continue of throw exception
        await _commitmentServices.CheckDuplicate(comReq.CommitmentCode);

        // call service
        CommitmentEntity com = Mapper.Map<CommitmentEntity>(comReq);
        await _commitmentServices.CreateCommitment(com, room);

        // update room status
        await _roomServices.Rent(room);

        return Ok(com);
    }

    // owner conform commitment ==> com.status => approved
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
    [HttpPost("joiningCode")]
    public async Task<IActionResult> CreateJoiningCode
        ([FromBody] CreateJoiningCodeRequest req)
    {
        // check exist and not expired commitment
        await _commitmentServices.GetNotExpiredCommitment(req.CommitementId);

        JoiningCode joiningCode = Mapper.Map<JoiningCode>(req);
        var response = await _joiningCodeServices.CreateJoiningCode(joiningCode);
        return Ok(response);
    }

    // get commitment by joining code
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
    //[Authorize(nameof(Role.Tenant))]
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
        await _commitmentServices.ActivatedCommitment(com, req.TenantId);

        // get into room
       await _tenantServices.GetIntoRoom(com.RoomId, req.TenantId);
        return Ok(com);
    }

    // update pending commitment
    [HttpPatch("{comId}")]
    public async Task<IActionResult> UpdatePendingCommitment([FromRoute] Guid comId, UpdateCommitmentRequest uComReq)
    {
        CommitmentEntity pendingCom = await _commitmentServices.GetCommitment(comId, CommitmentStatus.Pending);
        CommitmentEntity updatedCommitment = Mapper.Map(uComReq, pendingCom);
        await _commitmentServices.UpdatePendingCommitment(updatedCommitment);
        return Ok();
    }

    // get commitment details for tenant
    [HttpGet("{comId}/get-commitment-details/{tenantId}")]
    public async Task<IActionResult> GetCommitmentDetailsForTenant
        ([FromRoute] Guid comId, [FromRoute] Guid tenantId)
    {
        CommitmentEntity com = await _commitmentServices.GetCommitment(comId);

        _commitmentServices.ValidateTenant(com, tenantId);

        return Ok(com);
    }

}
