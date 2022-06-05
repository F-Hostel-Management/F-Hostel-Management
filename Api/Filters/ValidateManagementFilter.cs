using Application.Interfaces;
using AutoWrapper.Wrappers;
using Domain.Entities.Room;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Api.Filters;

public class ValidateManagementFilter : IAsyncActionFilter
{
    private readonly IHostelServices _hostelServices;
    private readonly IRoomServices _roomServices;
    public ValidateManagementFilter(IHostelServices hostelServices, IRoomServices roomServices)
    {
        _hostelServices = hostelServices;
        _roomServices = roomServices;
    }

    public async Task OnActionExecutionAsync
        (ActionExecutingContext context, ActionExecutionDelegate next)
    {
        Guid userID = Guid.Parse(context.HttpContext
            .User.Claims.FirstOrDefault(a => a.Type == "id").Value);
        Guid hostelId = Guid.Empty;

        var routeData = context.RouteData;
        var hostelIdData = routeData.Values["hostelId"] as string;
        if (!string.IsNullOrEmpty(hostelIdData))
        {
            hostelId = Guid.Parse(hostelIdData);
        }
        else
        {
            var roomIdData = routeData.Values["roomId"] as string;
            if (!string.IsNullOrEmpty(roomIdData))
            {
                Guid roomId = Guid.Parse(roomIdData);
                RoomEntity room = await _roomServices.GetRoom(roomId);
                hostelId = room.HostelId;
            }
        }
        bool isManagedByCurrentUser = await _hostelServices.IsHostelManagedBy(hostelId, userID);
        if (!isManagedByCurrentUser)
        {
            throw new ApiException("Forbidden", StatusCodes.Status403Forbidden);
        }
        await next();
    }
}
