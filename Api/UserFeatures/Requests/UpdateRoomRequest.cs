using Api.Mappings;
using Domain.Entities.Room;
using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests;

public class UpdateRoomRequest: IMapTo<RoomEntity>
{
    public string RoomName { get; set; }
    [Range(1, 100)]
    public int? Quantity { get; set; }
    public int? MaximumPeople { get; set; }
    [Range(1, 100)]
    public int? NumOfWindows { get; set; }
    [Range(1, 100)]
    public int? NumOfDoors { get; set; }
    [Range(1, 100)]
    public int? NumOfBathRooms { get; set; }
    [Range(1, 100)]
    public int? NumOfBedRooms { get; set; }
    [Range(1, 100)]
    public int? NumOfWCs { get; set; }

    [Range(0, double.MaxValue)]
    public double? Area { get; set; }
    
    [Range(0, double.MaxValue)]
    public double? Length { get; set; }

    [Range(0, double.MaxValue)]
    public double? Width { get; set; }

    [Range(0, double.MaxValue)]
    public double? Height { get; set; }
}
