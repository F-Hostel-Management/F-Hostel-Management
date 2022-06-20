using Api.Services;
using Api.UserFeatures.Requests;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Utilities;
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
    private readonly HandleCommitmentRequestService _reqHandler;
    private readonly IGenericRepository<CommitmentEntity> _commitmentRepository;
    private readonly IGenericRepository<UserEntity> _userRepository;



    public CommitmentsController(
        IHostelServices hostelServices,
        ICommitmentServices commitmentServices,
        IJoiningCodeServices joiningCodeServices,
        IRoomServices roomServices,
        ITenantServices tenantServices,
        IAuthorizationServices authorServices,
        HandleCommitmentRequestService reqHandler,
        IGenericRepository<CommitmentEntity> commitmentRepository,
        IGenericRepository<UserEntity> userRepository)
    {
        _tenantServices = tenantServices;
        _hostelServices = hostelServices;
        _joiningCodeServices = joiningCodeServices;
        _commitmentServices = commitmentServices;
        _roomServices = roomServices;
        _authorServices = authorServices;
        _reqHandler = reqHandler;
        _commitmentRepository = commitmentRepository;
        _userRepository = userRepository;
    }
    /// <summary>
    /// owner || manager create a commitment of room |
    /// commitment status ==> pending |
    /// room status ==> rent
    /// </summary>
    /// <param name="comReq"></param>
    /// <returns></returns>
    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPost()]
    public async Task<IActionResult> CreateCommitment(CreateCommitmentRequest comReq)
    {
        RoomEntity room = await _roomServices
            .GetRoom(comReq.RoomId, RoomStatus.Available); // check room

        HostelEntity hostel = await _hostelServices.GetHostel(room);
        bool isManagedByCurrentUser = await _authorServices.IsRoomManageByCurrentUser(comReq.RoomId, CurrentUserID);
        if (!isManagedByCurrentUser)
        {
            throw new ForbiddenException("Forbidden");
        } // check authorized

        CommitmentEntity commitment = await _reqHandler.FillCommitmentForOwner(comReq, hostel, room, Mapper);
        if (CurrentUserRole.Equals(Role.Manager.ToString()))
        {
            commitment.ManagerId = CurrentUserID;
        }
        if (comReq.Tenant != null)
        {
            UserEntity tenant = Mapper.Map<UserEntity>(comReq.Tenant);
            commitment = _reqHandler.FillCommitmentForTenant(commitment, tenant, Mapper);
            commitment.CanModify = false;
        }
        await _commitmentServices.CreateCommitment(commitment);

        // update room status
        await _roomServices.RentThisRoom(room);

        return Ok(commitment.Id);
    }


    [Authorize]
    [HttpGet("get-commitment-html-base64/{comId}")]
    public async Task<IActionResult> GetCommitmentHtmlById([FromRoute] Guid comId)
    {
        CommitmentEntity commitment = await _commitmentRepository.FindByIdAsync(comId);
        if (commitment is null)
        {
            throw new NotFoundException("Commitment not found");
        }
        bool isManagedByCurrentUser;
        if (CurrentUserRole.Equals(Role.Tenant.ToString()))
        {
            isManagedByCurrentUser = await _authorServices.IsCurrentUserRentingTheRoom(commitment, CurrentUserID);
        }
        else
        {
            isManagedByCurrentUser = await _authorServices.IsHostelManagedByCurrentUser(commitment.HostelId, CurrentUserID);
        }
        if (!isManagedByCurrentUser)
        {
            throw new ForbiddenException("Forbidden");
        }
        var response = await _reqHandler.GetCommitmentHtmlBase64(commitment, CurrentUserID);
        return Ok(response);
    }

    [Authorize(Roles = nameof(Role.Owner))]
    [HttpPatch("owner-approved-commitment/{comId}/status")]
    public async Task<IActionResult> OwnerApprovedCommitment
        ([FromRoute] Guid comId)
    {
        // get pending commitment
        CommitmentEntity com = await _commitmentServices.GetCommitment(comId, CommitmentStatus.Pending);

        await _commitmentServices.ApprovedCommitment(com);
        return Ok();
    }


    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPost("{comId}/create-joining-code")]
    public async Task<IActionResult> CreateJoiningCode
        ([FromRoute] Guid comId)
    {
        CommitmentEntity com = await _commitmentServices.GetApprovedOrActiveCommitment(comId);
        HostelEntity hostel = await _authorServices.GetHostelThatManagedByCurrentUser(com.HostelId, CurrentUserID);
        if (hostel == null)
        {
            throw new ForbiddenException("Forbidden");
        }
        JoiningCode joiningCode = new()
        {
            TimeSpan = hostel.QrTimeSpan,
            CommitmentId = comId,
        };
        var response = await _joiningCodeServices.CreateJoiningCode(joiningCode);
        return Ok(response);
    }

    /// <summary>
    /// tenant using qr to get commitment
    /// </summary>
    /// <param name="SixDigitsCode"></param>
    /// <returns></returns>
    [Authorize(Roles = nameof(Role.Tenant))]
    [HttpGet("get-commitment-by-joiningCode/{SixDigitsCode}")]
    public async Task<IActionResult> GetCommitmentUsingJoiningCode([FromRoute] int SixDigitsCode)
    {
        // validate joining code
        JoiningCode joiningCode = await _joiningCodeServices.GetJoiningCode(SixDigitsCode);
        _joiningCodeServices.ValidateJoiningCode(joiningCode);

        CommitmentEntity commitment = await _joiningCodeServices.GetCommitment(joiningCode);
        if (commitment.CanModify)
        {
            UserEntity tenant = await _userRepository.FindByIdAsync(CurrentUserID);
            commitment = _reqHandler.FillCommitmentForTenant(commitment, tenant, Mapper);
            await _commitmentRepository.UpdateAsync(commitment);
        }
        var response = await _reqHandler.GetCommitmentHtmlBase64(commitment, CurrentUserID);
        return Ok(response);
    }


    [Authorize(Roles = nameof(Role.Tenant))]
    [HttpPatch("tenant-activate-commitment/{SixDigitsCode}/status")]
    public async Task<IActionResult> TenantActivateCommitment
    ([FromRoute] int SixDigitsCode)
    {
        // validate joining code
        JoiningCode joiningCode = await _joiningCodeServices.GetJoiningCode(SixDigitsCode);
        _joiningCodeServices.ValidateJoiningCode(joiningCode);

        CommitmentEntity commitment = await _joiningCodeServices.GetCommitment(joiningCode);

        // activate commitment
        if (commitment.CanModify)
        {
            if (commitment.TenantId == null)
            {
                throw new BadRequestException("Bad Request"); // tenant still not read commitment
            }
            await _commitmentServices.ActivatedCommitment(commitment);
        }
        // get into room
        await _tenantServices.GetIntoRoom(commitment, CurrentUserID);
        return Ok();
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
        Mapper.Map(uComReq, pendingCom);
        if (CurrentUserRole.Equals(Role.Manager.ToString()))
        {
            pendingCom.ManagerId = CurrentUserID;
        }
        await _commitmentServices.UpdatePendingCommitment(pendingCom);
        return Ok();
    }

    [Authorize(Roles = nameof(Role.Owner))]
    [HttpDelete("{comId}")]
    public async Task<IActionResult> DeleteCommitment([FromRoute] Guid comId)
    {
        var com = await _commitmentServices.GetCommitment(comId);
        if (com.CommitmentStatus == CommitmentStatus.Active || com.CommitmentStatus == CommitmentStatus.Expired)
        {
            return BadRequest();
        }
        com.IsDeleted = true;
        await _commitmentRepository.UpdateAsync(com);

        RoomEntity room = await _roomServices.GetRoom(com.RoomId);
        room.RoomStatus = RoomStatus.Available;

        return Ok();
    }
}
