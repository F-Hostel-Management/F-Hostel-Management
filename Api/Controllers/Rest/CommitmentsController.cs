using Api.UserFeatures.Requests;
using Application.Exceptions;
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
    private readonly IGenericRepository<RoomEntity> _roomRepository;
    private readonly IGenericRepository<UserEntity> _userRepository;



    public CommitmentsController(
        IHostelServices hostelServices,
        ICommitmentServices commitmentServices,
        IJoiningCodeServices joiningCodeServices,
        IRoomServices roomServices,
        ITenantServices tenantServices,
        IAuthorizationServices authorServices,
        IGenericRepository<CommitmentEntity> commitmentRepository,
        IGenericRepository<RoomEntity> roomRepository,
        IGenericRepository<UserEntity> userRepository)
    {
        _tenantServices = tenantServices;
        _hostelServices = hostelServices;
        _joiningCodeServices = joiningCodeServices;
        _commitmentServices = commitmentServices;
        _roomServices = roomServices;
        _authorServices = authorServices;
        _commitmentRepository = commitmentRepository;
        _roomRepository = roomRepository;
        _userRepository = userRepository;
    }

    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPost()]
    public async Task<IActionResult> CreateCommitment(CreateCommitmentRequest comReq)
    {
        // get available room
        RoomEntity room = await _roomServices.GetRoom(comReq.RoomId, RoomStatus.Available);
        if (room == null)
        {
            throw new NotFoundException($"Room not found");
        }

        bool isManagedByCurrentUser = await _authorServices.IsRoomManageByCurrentUser(comReq.RoomId, CurrentUserID);
        if (!isManagedByCurrentUser)
        {
            throw new ForbiddenException("Forbidden");
        } // check authorized

        // create commitment
        int code = await _commitmentServices.CountCommitmentByHostel(room.HostelId) + 1;
        CommitmentEntity commitment = new()
        {
            CommitmentCode = "F-" + code,
            CreatedDate = DateTime.Now,
            HostelId = room.HostelId,
            OwnerId = room.Hostel.OwnerId,
        };
        Mapper.Map(comReq, commitment);

        if (CurrentUserRole.Equals(Role.Manager.ToString()))
        {
            commitment.ManagerId = CurrentUserID;
        }

        await _commitmentServices.CreateCommitment(commitment);

        // update room status
        await _roomServices.RentThisRoom(room);

        return Ok(commitment.Id);
    }

    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPost("{commitmentId}/upload-commitment-imanges")]
    public async Task<IActionResult> UploadCommitmentImages(Guid commitmentId,[FromForm] UploadCommitmentImagesRequest uploadCommitmentImagesRequest)
    {
        var commitment = await _commitmentServices.GetCommitment(commitmentId);
        bool isAuthorized = await _authorServices.IsRoomManageByCurrentUser(commitment.RoomId, CurrentUserID);
        if (!isAuthorized)
        {
            throw new ForbiddenException("Forbidden");
        }

        commitment.Images = await _commitmentServices.UploadCommitment(commitment, uploadCommitmentImagesRequest.ImgsFormFiles);
        await _commitmentRepository.UpdateAsync(commitment);
        return Ok(commitment.Images);
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


    [Authorize(Roles = nameof(Role.Tenant))]
    [HttpGet("get-commitment-by-joiningCode/{SixDigitsCode}")]
    public async Task<IActionResult> GetCommitmentUsingJoiningCode([FromRoute] int SixDigitsCode)
    {
        // validate joining code
        JoiningCode joiningCode = await _joiningCodeServices.GetJoiningCode(SixDigitsCode);
        _joiningCodeServices.ValidateJoiningCode(joiningCode);

        CommitmentEntity commitment = await _joiningCodeServices.GetCommitment(joiningCode);

        var response = "commitment img";
        return Ok(commitment);
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
        if (commitment.TenantId is null)
        {
            await _commitmentServices.ActivatedCommitment(commitment);
            commitment.TenantId = CurrentUserID;
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
