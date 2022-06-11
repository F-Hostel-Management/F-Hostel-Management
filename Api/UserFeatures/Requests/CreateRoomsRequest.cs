using Api.Mappings;
using Domain.Entities.Room;
using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests;

public class CreateRoomsRequest : IMapTo<RoomEntity>
{
    public string RoomName { get; set; }
    [Required]
    [Range(1, 100)]
    public int Quantity { get; set; }
    public int? MaximumPeople { get; set; }
    [Required]
    [Range(1, 100)]
    public int NumOfWindows { get; set; }
    [Required]
    [Range(1, 100)]
    public int NumOfDoors { get; set; }
    [Required]
    [Range(1, 100)]
    public int NumOfBathRooms { get; set; }
    [Required]
    [Range(1, 100)]
    public int NumOfBedRooms { get; set; }
    [Required]
    [Range(1, 100)]
    public int NumOfWCs { get; set; }
    [Required]
    [Range(0, double.MaxValue)]
    public double Area { get; set; }
    [Required]
    [Range(0, double.MaxValue)]
    public double Length { get; set; }
    [Required]
    [Range(0, double.MaxValue)]
    public double Width { get; set; }
    [Required]
    [Range(0, double.MaxValue)]
    public double Height { get; set; }
    [Required]
    public Guid HostelId { get; set; }
}
