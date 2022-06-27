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
    private readonly IGenericRepository<CommitmentImages> _commitmentImagesRepository;



    public CommitmentsController(
        IHostelServices hostelServices,
        ICommitmentServices commitmentServices,
        IJoiningCodeServices joiningCodeServices,
        IRoomServices roomServices,
        ITenantServices tenantServices,
        IAuthorizationServices authorServices,
        IGenericRepository<CommitmentEntity> commitmentRepository,
        IGenericRepository<RoomEntity> roomRepository,
        IGenericRepository<UserEntity> userRepository,
        IGenericRepository<CommitmentImages> commitmentImagesRepository)
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
        _commitmentImagesRepository = commitmentImagesRepository;
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
    [HttpPost("{commitmentId}/upload-commitment-images")]
    public async Task<IActionResult> UploadCommitmentImages(Guid commitmentId, [FromForm] UploadCommitmentImagesRequest uploadCommitmentImagesRequest)
    {
        var commitment = await _commitmentServices.GetCommitment(commitmentId);
        bool isAuthorized = await _authorServices.IsRoomManageByCurrentUser(commitment.RoomId, CurrentUserID);
        if (!isAuthorized)
        {
            throw new ForbiddenException("Forbidden");
        }

        commitment.Images = await _commitmentServices.UploadCommitment(commitment, uploadCommitmentImagesRequest.ImgsFormFiles);
        await _commitmentRepository.UpdateAsync(commitment);
        return Ok(commitment.Images.Select(img => img.ImgUrl));
    }

    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpDelete("{commitmentId}/delete-commitment-image")]
    public async Task<IActionResult> DeleteCommitmentImageAsync([FromRoute] Guid commitmentId, DeleteCommitmentImageRequest deleteCommitmentImageRequest)
    {
        var commitment = (await _commitmentRepository.WhereAsync(com =>
                          com.Id.Equals(commitmentId), new string[] { "Images" })).FirstOrDefault();
        if (commitment == null)
        {
            throw new NotFoundException("Commitment not found");
        }

        bool isAuthorized = await _authorServices.IsHostelManagedByCurrentUser(commitment.HostelId, CurrentUserID);
        if (!isAuthorized)
        {
            throw new ForbiddenException("Forbidden");
        }

        var target = commitment.Images.FirstOrDefault(img => img.ImgUrl.Equals(deleteCommitmentImageRequest.ImgUrl));
        if (target is null)
        {
            throw new BadRequestException("An image does not exist");
        }
        await _commitmentServices.DeleteCommitmentImage(target);
        return Ok();
    }

    [Authorize]
    [HttpGet("{commitmentId}/get-commitment-images")]
    public async Task<IActionResult> GetAllCommitmentImagesAsync([FromRoute] Guid commitmentId)
    {
        var commitment = (await _commitmentRepository.WhereAsync(com =>
                  com.Id.Equals(commitmentId), new string[] { "Images" })).FirstOrDefault();
        if (commitment == null)
        {
            throw new NotFoundException("Commitment not found");
        }
        return Ok(commitment.Images.Select(img => img.ImgUrl));
    }


    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPost("{comId}/create-joining-code")]
    public async Task<IActionResult> CreateJoiningCode
        ([FromRoute] Guid comId)
    {
        CommitmentEntity commitment = await _commitmentServices.GetCommitment(comId, CommitmentStatus.Active);
        if (commitment is null)
        {
            throw new NotFoundException("Commitment not found");
        }
        HostelEntity hostel = await _authorServices.GetHostelThatManagedByCurrentUser(commitment.HostelId, CurrentUserID);
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
    [HttpPost("validate-joiningCode")]
    public async Task<IActionResult> GetCommitmentUsingJoiningCode(ValidateJoiningCodeRequest req)
    {
        // validate joining code
        JoiningCode joiningCode = await _joiningCodeServices.GetJoiningCode(req.SixDigitsCode);
        if (joiningCode is null)
        {
            throw new NotFoundException("Joining code is not exists or expired");
        }
        _joiningCodeServices.ValidateJoiningCode(joiningCode);
        CommitmentEntity commitment = await _joiningCodeServices.GetCommitment(joiningCode);
        return Ok(commitment);
    }


    [Authorize(Roles = nameof(Role.Tenant))]
    [HttpPatch("get-into-room")]
    public async Task<IActionResult> TenantActivateCommitment(ValidateJoiningCodeRequest req)
    {
        // validate joining code again
        JoiningCode joiningCode = await _joiningCodeServices.GetJoiningCode(req.SixDigitsCode);
        if (joiningCode is null)
        {
            throw new NotFoundException("Joining code is not exists or expired");
        }
        _joiningCodeServices.ValidateJoiningCode(joiningCode);
        CommitmentEntity commitment = await _joiningCodeServices.GetCommitment(joiningCode);

        // get into room
        await _tenantServices.GetIntoRoom(commitment, CurrentUserID);
        return Ok();
    }

    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPatch("{comId}")]
    public async Task<IActionResult> UpdateCommitment([FromRoute] Guid comId, UpdateCommitmentRequest uComReq)
    {
        CommitmentEntity entity = await _commitmentServices.GetCommitment(comId, CommitmentStatus.Active);
        Mapper.Map(uComReq, entity);
        if (CurrentUserRole.Equals(Role.Manager.ToString()))
        {
            entity.ManagerId = CurrentUserID;
        }
        await _commitmentRepository.UpdateAsync(entity);
        return Ok();
    }

    [Authorize(Roles = nameof(Role.Owner))]
    [HttpDelete("{comId}")]
    public async Task<IActionResult> DeleteCommitment([FromRoute] Guid comId)
    {
        var commitment = await _commitmentRepository.FindByIdAsync(comId, new string[] { "RoomTenants" });
        if (commitment is null)
        {
            throw new NotFoundException("Commitment not found");
        }

        if (commitment.CommitmentStatus == CommitmentStatus.Active && commitment.RoomTenants.Any())
        {
            throw new BadRequestException("Cannot delete current commitment of room that has tenant(s)");
        }
        else if (commitment.CommitmentStatus == CommitmentStatus.Active && !commitment.RoomTenants.Any())
        {
            RoomEntity room = await _roomServices.GetRoom(commitment.RoomId);
            await _roomServices.ReleaseRoom(room);
        } 
        await _commitmentRepository.DeleteSoftAsync(commitment);
        return Ok();
    }
}
