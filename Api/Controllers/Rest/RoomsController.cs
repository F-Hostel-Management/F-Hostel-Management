using Api.Filters;
using Api.UserFeatures.Requests;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Constants;
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
    public RoomsController(
        IGenericRepository<RoomEntity> roomsRepository,
        ICommitmentServices commitmentServices,
        IHostelServices hostelServices)
    {
        _roomsRepository = roomsRepository;
        _commitmentServices = commitmentServices;
        _hostelServices = hostelServices;
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
        bool isManagedByCurrentUser = await _hostelServices.IsHostelManagedBy(req.HostelId, CurrentUserID);
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
}
