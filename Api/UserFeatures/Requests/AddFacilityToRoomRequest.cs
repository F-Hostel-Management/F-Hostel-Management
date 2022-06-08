﻿using System.ComponentModel.DataAnnotations;
using Api.Mappings;
using Domain.Entities.Facility;

namespace Api.UserFeatures.Requests;

public class AddFacilityToRoomRequest:IMapTo<FacilityManagement>
{
    [Required]
    public Guid FacilityId { get; set; }
    [Required]
    public Guid RoomId { get; set; }
    [Required]
    public int Quantity { get; set; }
    
    public string? Description { get; set; }
}