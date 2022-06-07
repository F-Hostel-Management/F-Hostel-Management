using Api.Mappings;
using Domain.Entities.Room;
using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests;

public class CreateRoomsRequest : IMapTo<RoomEntity>
{

    public string RoomName { get; set; }
    public int? Quantity { get; set; }
    public int? MaximumPeople { get; set; }
    [Required]
    public int NumOfWindows { get; set; }
    [Required]
    public int NumOfDoors { get; set; }
    [Required]
    public int NumOfBathRooms { get; set; }
    [Required]
    public int NumOfWCs { get; set; }
    [Required]
    public double Price { get; set; }
    [Required]
    public double Area { get; set; }
    [Required]
    public double Length { get; set; }
    [Required]
    public double Width { get; set; }
    [Required]
    public double Height { get; set; }
    [Required]
    public Guid RoomTypeId { get; set; }
    [Required]
    public Guid HostelId { get; set; }
}
