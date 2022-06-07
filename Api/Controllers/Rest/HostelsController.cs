using Api.Filters;
using Api.UserFeatures.Requests;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Constants;
using Domain.Entities;
using Domain.Entities.Room;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest;

[Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
public class HostelsController : BaseRestController
{
    private readonly IGenericRepository<HostelEntity> _hostelRepository;
    private readonly IGenericRepository<RoomEntity> _roomRepository; 
    private readonly IHostelServices _hostelService;
    public HostelsController(
        IGenericRepository<HostelEntity> hostelRepository,
        IGenericRepository<RoomEntity> roomRepository,
        IHostelServices hostelServices)
    {
        _hostelRepository = hostelRepository;
        _roomRepository = roomRepository;
        _hostelService = hostelServices;
    }
    [Authorize(Roles = nameof(Role.Owner))]
    [HttpPost("create-hostel")]
    public async Task<IActionResult> CreateHostel(CreateHostelRequest createHostelRequest)
    {
        HostelEntity hostel = Mapper.Map<HostelEntity>(createHostelRequest);
        hostel.OwnerId = GetUserID();
        await _hostelRepository.CreateAsync(hostel);
        return Ok(hostel);
    }

    [ServiceFilter(typeof(ValidateManagementHostelLevelFilter))]
    [HttpPost("upload-hostel-image")]
    public async Task<IActionResult> UploadHostelImage([FromForm] UploadHostelImageRequest uploadHostelImageRequest)
    {
        var isManagedByCurrentUser = await _hostelService.IsHostelManagedBy(uploadHostelImageRequest.HostelId, CurrentUserID);
        if (!isManagedByCurrentUser)
            return Forbid();
        var target = await _hostelRepository.FirstOrDefaultAsync(e => e.Id.Equals(uploadHostelImageRequest.HostelId));
        await _hostelService.UploadHostelImage(target, uploadHostelImageRequest.Image);
        return Ok(target.ImgPath);
    }
}
