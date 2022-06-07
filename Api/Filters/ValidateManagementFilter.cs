using Application.Interfaces;
using AutoWrapper.Wrappers;
using Domain.Entities;
using Domain.Entities.Room;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Text;

namespace Api.Filters;

public class ValidateManagementHostelLevelFilter : IAsyncActionFilter
{
    private readonly ValidateManagementFilter _lastFilter;
    public ValidateManagementHostelLevelFilter
        (ValidateManagementFilter vmFilter)
    {
        _lastFilter = vmFilter;
    }

    public async Task OnActionExecutionAsync
        (ActionExecutingContext context, ActionExecutionDelegate next)
    {
        Guid hostelId = Guid.Empty;

        var routeData = context.RouteData;
        var hostelIdData = routeData.Values["hostelId"] as string;

        try
        {
            if (!Guid.TryParse(hostelIdData, out hostelId))
            {
                hostelId = await _lastFilter.GetIdValueFromRequestStreamAsync("HostelId", context);
            }
            context.HttpContext.Items.Add("hostelId", hostelId);
            await _lastFilter.OnActionExecutionAsync(context, next);
        }
        catch (ApiException ex)
        {
            throw new ApiException(ex.StackTrace, ex.StatusCode);
        }
    }
}

public class ValidateManagementByRoomLevelFilter : IAsyncActionFilter
{
    private readonly IRoomServices _roomServices;
    private readonly ValidateManagementFilter _lastFilter;


    public ValidateManagementByRoomLevelFilter(
        IRoomServices roomServices,
        ValidateManagementFilter lastFilter)
    {
        _roomServices = roomServices;
        _lastFilter = lastFilter;
    }

    public async Task OnActionExecutionAsync
        (ActionExecutingContext context, ActionExecutionDelegate next)
    {

        var roomIdData = context.RouteData.Values["roomId"] as string;
        Guid roomId = Guid.Empty;
        try
        {
            if (!Guid.TryParse(roomIdData, out roomId))
            {
                roomId = await _lastFilter.GetIdValueFromRequestStreamAsync("RoomId", context);
            }
            RoomEntity room = await _roomServices.GetRoom(roomId);
            context.HttpContext.Items.Add("hostelId", room.HostelId);
            await _lastFilter.OnActionExecutionAsync(context, next);
            context.HttpContext.Items.Add("room", room);
        }
        catch (ApiException ex)
        {
            throw new ApiException(ex.StackTrace, ex.StatusCode);
        }
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

    public async Task<Guid> GetIdValueFromRequestStreamAsync(string param, ActionExecutingContext context)
    {
        /*var bodyReader = new StreamReader(context.HttpContext.Request.Body);
        var bodyAsText = bodyReader.ReadToEnd();*/
        
        var bodyAsText = await new StreamReader(context.HttpContext.Request.Body,
            Encoding.UTF8, true, 1024, true).ReadToEndAsync();

        context.HttpContext.Request.Body.Position = 0;
        string guid = "";
        if (bodyAsText.Contains(param))
        {
            guid = bodyAsText.Substring(bodyAsText.IndexOf(param) + param.Length + 4, Guid.Empty.ToString().Length);
            return Guid.Parse(guid);

        }
        throw new ApiException("Bad request", StatusCodes.Status400BadRequest);
    }
}
