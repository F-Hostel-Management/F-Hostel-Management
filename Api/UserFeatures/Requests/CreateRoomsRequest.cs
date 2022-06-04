using Api.Mappings;
using Domain.Entities.Room;
using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests;

public class CreateRoomsRequest : IMapTo<RoomEntity>
{

    public string? RoomName { get; set; }
    [Required]
    public int? Quantity { get; set; }
    public int? MaximumPeople { get; set; }
    public int NumOfWindows { get; set; }
    public int NumOfDoors { get; set; }
    public int NumOfBathRooms { get; set; }
    public int NumOfWCs { get; set; }
    public double Price { get; set; }
    public double Area { get; set; }
    public double Length { get; set; }
    public double Width { get; set; }
    public double Height { get; set; }
    //[Required]
    public Guid RoomTypeId { get; set; }
    //[Required]
    public Guid HostelId { get; set; }
}
