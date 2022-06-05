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
    public RoomsController(
        IGenericRepository<RoomEntity> roomsRepository,
        IHostelServices hostelServices)
    {
        _roomsRepository = roomsRepository;
        _hostelServices = hostelServices;
    }

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
}
