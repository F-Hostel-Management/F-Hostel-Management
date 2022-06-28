using Api.UserFeatures.Requests;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Constants;
using Domain.Entities.Commitment;
using Domain.Entities.Facility;
using Domain.Entities.InvoiceSchedule;
using Domain.Entities.Room;
using Domain.Entities.User;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest;

public class RoomsController : BaseRestController
{
    private readonly IGenericRepository<RoomEntity> _roomsRepository;
    private readonly IGenericRepository<CommitmentEntity> _commitmentRepository;
    private readonly IGenericRepository<RoomTenant> _roomTenantRepository;
    private readonly ICommitmentServices _commitmentServices;
    private readonly IAuthorizationServices _authorServices;
    private readonly IInvoiceScheduleServices _invoiceScheduleServices;
    private readonly IRoomServices _roomServices;
    private readonly IGenericRepository<FacilityEntity> _facilityRepo;
    private readonly IGenericRepository<FacilityManagement> _facilityManagementRepo;
    private readonly IGenericRepository<InvoiceScheduleEntity> _invoiceScheduleRepository;

    public RoomsController
        (IGenericRepository<RoomEntity> roomsRepository,
        IGenericRepository<CommitmentEntity> commitmentRepository,
        IGenericRepository<RoomTenant> roomTenantRepository,
        ICommitmentServices commitmentServices,
        IAuthorizationServices authorServices,
        IRoomServices roomServices,
        IInvoiceScheduleServices invoiceScheduleServices,
        IGenericRepository<FacilityEntity> facilityRepo,
        IGenericRepository<FacilityManagement> facilityManagementRepo,
        IGenericRepository<InvoiceScheduleEntity> invoiceScheduleRepository)
    {
        _roomsRepository = roomsRepository;
        _commitmentRepository = commitmentRepository;
        _roomTenantRepository = roomTenantRepository;
        _commitmentServices = commitmentServices;
        _authorServices = authorServices;
        _roomServices = roomServices;
        _invoiceScheduleServices = invoiceScheduleServices;
        _facilityRepo = facilityRepo;
        _facilityManagementRepo = facilityManagementRepo;
        _invoiceScheduleRepository = invoiceScheduleRepository;
    }

    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPost()]
    public async Task<IActionResult> CreateRoomsAsync(CreateRoomsRequest req)
    {
        bool isManagedByCurrentUser = await _authorServices.IsHostelManagedByCurrentUser(req.HostelId, CurrentUserID);
        if (!isManagedByCurrentUser)
        {
            return Forbid();
        }

        if (req.RoomName == null)
        {
            req.RoomName = "Unnamed";
        }

        List<RoomEntity> rooms = new();
        while (req.Quantity > 0)
        {
            var room = Mapper.Map<RoomEntity>(req);
            room.RoomStatus = RoomStatus.Available;
            rooms.Add(room);
            req.Quantity--;
        }

        await _roomsRepository.CreateRangeAsync(rooms);
        return Ok();
    }

    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpPatch("{roomId}")]
    public async Task<IActionResult> UpdateRoomAsync([FromRoute] Guid roomId, UpdateRoomRequest updateRoomReq)
    {
        RoomEntity room = await _authorServices.GetRoomThatManagedByCurrentUser(roomId, CurrentUserID);
        if (room is null)
        {
            throw new ForbiddenException("Forbidden");
        }
        Mapper.Map(updateRoomReq, room);
        await _roomsRepository.UpdateAsync(room);
        return Ok(room);
    }

    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpDelete("{roomId}")]
    public async Task<IActionResult> DeleteRoomAsync([FromRoute] Guid roomId)
    {
        RoomEntity room = await _authorServices.GetRoomThatManagedByCurrentUser(roomId, CurrentUserID);
        if (room is null)
        {
            throw new ForbiddenException("Forbidden");
        }
        // resolve commitment
        bool hasCommitment = await _roomServices.HasCommitment(roomId);
        if (hasCommitment)
        {
            throw new BadRequestException("Resolve commitment first");
        }
        await _roomsRepository.DeleteSoftAsync(room);
        return Ok();
    }

    [Authorize(Roles = nameof(Role.Tenant))]
    [HttpGet("{roomId}/get-list-commitment-of-room-for-tenant")]
    public async Task<IActionResult> GetCommitmentsForTenant
    ([FromRoute] Guid roomId)
    {
        var coms = await _commitmentServices.GetCommitmentsForTenant(roomId, CurrentUserID);
        return Ok(coms);
    }

    [HttpPost("add-facility")]
    public async Task<IActionResult> AddFacilityToRoom(AddFacilityToRoomRequest request)
    {
        bool isManagedByCurrentUser = await _authorServices.IsRoomManageByCurrentUser(request.RoomId, CurrentUserID);
        if (!isManagedByCurrentUser)
            throw new ForbiddenException("");
        foreach (var facility in request.FacilityRooms)
        {
            // var test = await _facilityRepo.ListAsync();
            var facilityTarget = await _facilityRepo.FirstOrDefaultAsync(e => e.Id.Equals(facility.FacilityId));
            if (facilityTarget is null)
                throw new BadRequestException("Facility is not valid");
            var targetManagement = await _facilityManagementRepo.FirstOrDefaultAsync(e => e.FacilityId.Equals(facility.FacilityId) && e.RoomId.Equals(request.RoomId));
            if (targetManagement is not null)
                throw new BadRequestException("The facility has been existed in the room!");
            if (facilityTarget.Quantity < facility.Quantity)
                throw new BadRequestException("The hostel does not have enough quantity for this facility!");
            // if (facilityTarget.Quantity < facility.Quantity)
            //     throw new BadRequestException("The hostel does not have enough quantity for this facility!");
            var entity = new FacilityManagement();
            entity.FacilityId = facility.FacilityId;
            entity.Quantity = facility.Quantity;
            entity.Description = facility.Description;
            entity.RoomId = request.RoomId;

            // Mapper.Map(request, entity);
            await _facilityManagementRepo.CreateAsync(entity);
        }
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
        var facilityTarget = await _facilityRepo.FirstOrDefaultAsync(e => e.Id.Equals(target.FacilityId));
        if (facilityTarget is null)
            throw new BadRequestException("Facility is not valid");
        int total = facilityTarget.Quantity + target.Quantity;
        if (total < request.Quantity)
            throw new BadRequestException("The hostel does not have enough quantity for this facility!");
        Mapper.Map(request, target);
        await _facilityManagementRepo.UpdateAsync(target);
        return Ok();
    }
    [HttpDelete("delete-facility/{id}")]
    public async Task<IActionResult> DeleteFacilityFromRoom([FromRoute] Guid id)
    {
        var target = await _facilityManagementRepo.FirstOrDefaultAsync(e => e.Id.Equals(id));
        if (target is null)
            throw new BadRequestException("Facility is not valid");
        bool isManagedByCurrentUser = await _authorServices.IsRoomManageByCurrentUser(target.RoomId, CurrentUserID);
        if (!isManagedByCurrentUser)
            throw new ForbiddenException("");
        target.IsDeleted = true;
        await _facilityManagementRepo.UpdateAsync(target);
        return Ok();
    }


    [Authorize]
    [HttpPost("{roomId}/checkout")]
    public async Task<IActionResult> CheckoutThisRoom([FromRoute] Guid roomId)
    {
        RoomEntity room = await _roomsRepository.FindByIdAsync(roomId);
        if (room is null)
        {
            throw new NotFoundException("Room not found");
        }
        CommitmentEntity latestCommitment = await _commitmentServices.GetLatestCommitmentByRoom(roomId);

        // tenant self-checkout
        if (CurrentUserRole.Equals(Role.Tenant.ToString()))
        {
            bool isTenantAuthorized = await _authorServices.IsCurrentUserRentingTheRoom(latestCommitment, CurrentUserID);
            if (!isTenantAuthorized)
            {
                throw new ForbiddenException("Forbidden");
            }
            var roomtenant = await _roomTenantRepository.FirstOrDefaultAsync(rt =>
                                                       rt.TenantId.Equals(CurrentUserID) && rt.CommitmentId.Equals(latestCommitment.Id));
            await _roomTenantRepository.DeleteSoftAsync(roomtenant);
            return Ok();
        }

        // owner | manager checkout
        bool isManagerAuthorized = await _authorServices.IsRoomManageByCurrentUser(roomId, CurrentUserID);
        if (!isManagerAuthorized)
        {
            throw new ForbiddenException("Forbidden");
        }

        // set commitment to expired (if any)
        if (latestCommitment.CommitmentStatus != CommitmentStatus.Expired)
        {
            latestCommitment.CommitmentStatus = CommitmentStatus.Expired;
            await _commitmentRepository.UpdateAsync(latestCommitment);
        }
        await _invoiceScheduleServices.DeleteInvoicesScheduleByRoomId(roomId); // remove all invoice schedules of that room
        await _roomServices.ReleaseRoom(room);
        return Ok();
    }
}
