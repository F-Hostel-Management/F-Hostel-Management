using Api.Filters;
using Api.UserFeatures.Requests;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Constants;
using Domain.Entities.Facility;
using Domain.Entities.Room;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest;

public class RoomsController : BaseRestController
{
    private readonly IGenericRepository<RoomEntity> _roomsRepository;
    private readonly IHostelServices _hostelServices;
    private readonly ICommitmentServices _commitmentServices;
    private readonly IAuthorizationServices _authorServices;
    private readonly IGenericRepository<FacilityEntity> _facilityRepo;
    private readonly IGenericRepository<FacilityManagement> _facilityManagementRepo;

    public RoomsController(IGenericRepository<RoomEntity> roomsRepository, IHostelServices hostelServices, ICommitmentServices commitmentServices, IAuthorizationServices authorServices, IGenericRepository<FacilityEntity> facilityRepo, IGenericRepository<FacilityManagement> facilityManagementRepo)
    {
        _roomsRepository = roomsRepository;
        _hostelServices = hostelServices;
        _commitmentServices = commitmentServices;
        _authorServices = authorServices;
        _facilityRepo = facilityRepo;
        _facilityManagementRepo = facilityManagementRepo;
    }


 
    /// <summary>
    /// owner || manager create room of their hostel
    /// </summary>
    /// <param name="req"></param>
    /// <returns></returns>
    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPost()]
    public async Task<IActionResult> CreateRoomsAsync(CreateRoomsRequest req)
    {
        bool isManagedByCurrentUser = await _authorServices.IsHostelManagedByCurrentUser(req.HostelId, CurrentUserID);
        if (!isManagedByCurrentUser)
        {
            return Forbid();
        }

        if (req.Quantity == null || req.Quantity == 0)
        {
            req.Quantity = 1;
        }

        if (req.RoomName == null)
        {
            req.RoomName = "Unnamed";
        }

        List<RoomEntity> rooms = new List<RoomEntity>();
        while (req.Quantity > 0)
        {
            rooms.Add(Mapper.Map<RoomEntity>(req));
            req.Quantity--;
        }

        await _roomsRepository.CreateRangeAsync(rooms);
        return Ok();
    }

    /// <summary>
    /// only tenant get their commitments of that room
    /// </summary>
    /// <param name="roomId"></param>
    /// <returns></returns>
    [Authorize(Roles = nameof(Role.Tenant))]
    [HttpGet("{roomId}/get-list-commitment-of-room-for-tenant")]
    public async Task<IActionResult> GetCommitmentsForTenant
    ([FromRoute] Guid roomId)
    {
        var coms = await _commitmentServices.GetCommitmentForTenant(roomId, CurrentUserID);
        return Ok(coms);
    }

    [HttpPost("add-facility")]
    public async Task<IActionResult> AddFacilityToRoom(AddFacilityToRoomRequest request)
    {
        var facilityTarget = await _facilityRepo.FirstOrDefaultAsync(e => e.Id.Equals(request.FacilityId));
        if (facilityTarget is null)
            throw new BadRequestException("Facility is not valid");
        bool isManagedByCurrentUser = await _authorServices.IsRoomManageByCurrentUser(request.RoomId, CurrentUserID);
        if (!isManagedByCurrentUser)
            throw new ForbiddenException("");
        var targetFacility = await _facilityRepo.FirstOrDefaultAsync(e => e.Id.Equals(facilityTarget.Id));
        if (targetFacility is null)
            throw new BadRequestException("Wrong Facility ID");
        var entity = new FacilityManagement();
        Mapper.Map(request, entity);
        await _facilityManagementRepo.CreateAsync(entity);
        return Ok();
    }
    [HttpPatch("update-facility")]
    public async Task<IActionResult> UpdateFacilityFromRoom(UpdateFacilityToRoomRequest request)
    {
        var target = await _facilityManagementRepo.FirstOrDefaultAsync(e => e.Id.Equals(request.FacilityManagementId));
        if (target is null)
            throw new BadRequestException("Facility is not valid");
        bool isManagedByCurrentUser = await _authorServices.IsRoomManageByCurrentUser(target.RoomId, CurrentUserID);
        if (!isManagedByCurrentUser)
            throw new ForbiddenException("");
        Mapper.Map(request, target);
        await _facilityManagementRepo.UpdateAsync(target);
        return Ok();
    }
    [HttpDelete("delete-facility")]
    public async Task<IActionResult> DeleteFacilityFromRoom(DeleteFacilityFromRoomRequest request)
    {
        var target = await _facilityManagementRepo.FirstOrDefaultAsync(e => e.Id.Equals(request.FacilityManagementId));
        if (target is null)
            throw new BadRequestException("Facility is not valid");
        bool isManagedByCurrentUser = await _authorServices.IsRoomManageByCurrentUser(target.RoomId, CurrentUserID);
        if (!isManagedByCurrentUser)
            throw new ForbiddenException("");
        target.IsDeleted = true;
        await _facilityManagementRepo.UpdateAsync(target);
        return Ok();
    }
}
