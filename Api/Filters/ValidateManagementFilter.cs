using Application.Exceptions;
using Application.Interfaces;
using AutoWrapper.Wrappers;
using Domain.Entities;
using Domain.Entities.Room;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Api.Filters;

public class ValidateManagementHostelLevelFilter : IAsyncActionFilter
{
    private readonly ValidateManagementFilter _vmFilter;
    public ValidateManagementHostelLevelFilter
        (ValidateManagementFilter vmFilter)
    {
        _vmFilter = vmFilter;
    }

    public async Task OnActionExecutionAsync
        (ActionExecutingContext context, ActionExecutionDelegate next)
    {
        Guid hostelId = Guid.Empty;

        var routeData = context.RouteData;
        var hostelIdData = routeData.Values["hostelId"] as string;

        if (Guid.TryParse(hostelIdData, out hostelId))
        {
            context.HttpContext.Items.Add("hostelId", hostelId);
            await _vmFilter.OnActionExecutionAsync(context, next);
            await next();
        }
        throw new ForbiddenException("Forbidden");
    }
}

public class ValidateManagementByRoomLevelFilter : IAsyncActionFilter
{
    private readonly IRoomServices _roomServices;
    private readonly ValidateManagementFilter _vmFilter;


    public ValidateManagementByRoomLevelFilter(
        IRoomServices roomServices,
        ValidateManagementFilter vmFilter)
    {
        _roomServices = roomServices;
        _vmFilter = vmFilter;
    }

    public async Task OnActionExecutionAsync
        (ActionExecutingContext context, ActionExecutionDelegate next)
    {

        var roomIdData = context.RouteData.Values["roomId"] as string;

        if (!string.IsNullOrEmpty(roomIdData))
        {
            Guid roomId = Guid.Parse(roomIdData);
            RoomEntity room = await _roomServices.GetRoom(roomId);
            context.HttpContext.Items.Add("hostelId", room.HostelId);
            await _vmFilter.OnActionExecutionAsync(context, next);
            context.HttpContext.Items.Add("room", room);
            await next();
        }
        throw new ForbiddenException("Forbidden");

    }
}

public class ValidateManagementFilter : IAsyncActionFilter
{
    private readonly IHostelServices _hostelServices;

    public ValidateManagementFilter(IHostelServices hostelServices)
    {
        _hostelServices = hostelServices;
    }
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        Guid userID = Guid.Parse(context.HttpContext
                      .User.Claims.FirstOrDefault(a => a.Type == "id").Value);

        Guid hostelId = (Guid)context.HttpContext.Items["hostelId"];
        HostelEntity hostel = await _hostelServices.HostelManagedBy(hostelId, userID);
        context.HttpContext.Items.Add("hostel", hostel);
        await next();
    }
}
