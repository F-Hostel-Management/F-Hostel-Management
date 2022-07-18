using Api.Filters;
using Api.UserFeatures.Requests;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Services;
using Domain.Constants;
using Domain.Entities;
using Domain.Entities.Invoice;
using Domain.Entities.Room;
using Domain.Entities.User;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest;

[Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
public class HostelsController : BaseRestController
{
    private readonly IGenericRepository<HostelEntity> _hostelRepository;
    private readonly IGenericRepository<RoomTenant> _roomtenantRepository;
    private readonly IGenericRepository<InvoiceEntity> _invoiceRepository;
    private readonly IHostelServices _hostelService;
    private readonly IAuthorizationServices _authorServices;

    public HostelsController(
        IGenericRepository<HostelEntity> hostelRepository,
        IGenericRepository<RoomTenant> roomtenantRepository,
        IGenericRepository<InvoiceEntity> invoiceRepository,
        IHostelServices hostelServices,
        IAuthorizationServices authorServices)
    {
        _hostelRepository = hostelRepository;
        _roomtenantRepository = roomtenantRepository;
        _invoiceRepository = invoiceRepository;
        _hostelService = hostelServices;
        _authorServices = authorServices;
    }
    /// <summary>
    /// owner create hostel
    /// </summary>
    /// <param name="createHostelRequest"></param>
    /// <returns></returns>
    [Authorize(Roles = nameof(Role.Owner))]
    [HttpPost("create-hostel")]
    public async Task<IActionResult> CreateHostel(CreateOrUpdateHostelRequest createHostelRequest)
    {
        HostelEntity hostel = Mapper.Map<HostelEntity>(createHostelRequest);
        hostel.OwnerId = GetUserID();
        await _hostelRepository.CreateAsync(hostel);
        return Ok(hostel);
    }

    /// <summary>
    /// owner || manager update hostel image
    /// </summary>
    /// <param name="uploadHostelImageRequest"></param>
    /// <returns></returns>
    [HttpPost("upload-hostel-image")]
    public async Task<IActionResult> UploadHostelImage([FromForm] UploadHostelImageRequest uploadHostelImageRequest)
    {
        var isManagedByCurrentUser = await _authorServices.IsHostelManagedByCurrentUser(uploadHostelImageRequest.HostelId, CurrentUserID);
        if (!isManagedByCurrentUser)
            return Forbid();
        var target = await _hostelRepository.FirstOrDefaultAsync(e => e.Id.Equals(uploadHostelImageRequest.HostelId));
        await _hostelService.UploadHostelImage(target, uploadHostelImageRequest.Image);
        return Ok(target.ImgPath);
    }

    [HttpGet("{hostelId}/rooms")]
    public async Task<IActionResult> GetAllRooms([FromRoute] Guid hostelId)
    {
        var hostel = await _authorServices.GetHostelThatManagedByCurrentUser(hostelId, CurrentUserID);
        if (hostel is null)
            throw new ForbiddenException("Forbidden");
        return Ok(hostel.Rooms);
    }

    [HttpGet("{hostelId}/tenants")]
    public async Task<IActionResult> GetAllTenants([FromRoute] Guid hostelId)
    {
        var hostel = await _authorServices.GetHostelThatManagedByCurrentUser(hostelId, CurrentUserID);
        if (hostel is null)
            throw new ForbiddenException("Forbidden");

        var commitmentIds = hostel.Commitments
                                  .Where(com => com.CommitmentStatus != CommitmentStatus.Expired)
                                  .Select(com => com.Id);
        var tenants = (await _roomtenantRepository
                                  .WhereAsync(rt => commitmentIds.Contains(rt.CommitmentId), new string[] { "Tenant" }))
                                  .Select(rt => rt.Tenant)
                                  .DistinctBy(t => t.Id);
                                  ;
        return Ok(tenants);
    }

    [HttpGet("{hostelId}/revenue")]
    public async Task<IActionResult> GetHostelRevenue([FromRoute] Guid hostelId)
    {
        var hostel = await _authorServices.GetHostelThatManagedByCurrentUser(hostelId, CurrentUserID);
        if (hostel is null)
            throw new ForbiddenException("Forbidden");

        var roomIds = hostel.Rooms.Select(r => r.Id);
        var paidInvoices = await _invoiceRepository.WhereAsync(invoice => 
                                                    roomIds.Contains(invoice.RoomId) 
                                                    && invoice.TenantPaid != null);
        return Ok(paidInvoices.Sum(invoice => invoice.Price));
    }

    [HttpPatch("{hostelId}")]
    public async Task<IActionResult> UpdateHostelAsync([FromRoute] Guid hostelId, CreateOrUpdateHostelRequest updateHostelRequest)
    {   
        var hostel = await _authorServices.GetHostelThatManagedByCurrentUser(hostelId, CurrentUserID);
        if (hostel is null)
        {
            throw new ForbiddenException("Forbidden");
        }
        Mapper.Map(updateHostelRequest, hostel);
        await _hostelRepository.UpdateAsync(hostel);
        return Ok();
    }

    [Authorize(Roles = nameof(Role.Owner))]
    [HttpDelete("{hostelId}")]
    public async Task<IActionResult> DeleteHostelAsync([FromRoute] Guid hostelId)
    {
        var hostel = await _hostelRepository.FindByIdAsync(hostelId, new string[] { "Commitments" });
        if (hostel is null)
        {
            throw new NotFoundException("Hostel not found");
        }
        var isAuthorized = await _authorServices.IsHostelManagedByCurrentUser(hostelId, CurrentUserID);
        if (!isAuthorized)
        {
            throw new ForbiddenException("Forbidden");
        }
        var validCommitments = hostel.Commitments.Where(commitment => commitment.CommitmentStatus == CommitmentStatus.Active);
        if (validCommitments.Any())
        {
            throw new BadRequestException("The room is still rented, cannot delete the hostel");
        }

        await _hostelRepository.DeleteSoftAsync(hostel);
        return Ok();
    }

    [HttpPatch("{hostelId}/timespan")]
    public async Task<IActionResult> UpdateQrTimeSpanAsync([FromRoute] Guid hostelId, UpdateTimespanRequest updateTimespanRequest)
    {
        var hostel = await _authorServices.GetHostelThatManagedByCurrentUser(hostelId, CurrentUserID);
        if (hostel is null)
        {
            throw new ForbiddenException("Forbidden");
        }
        Mapper.Map(updateTimespanRequest, hostel);
        await _hostelRepository.UpdateAsync(hostel);
        return Ok();
    }
}


