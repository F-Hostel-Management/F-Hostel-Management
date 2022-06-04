using Api.UserFeatures.Requests;
using Application.Interfaces.IRepository;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest;

public class HostelsController : BaseRestController
{
    private readonly IGenericRepository<HostelEntity> _hostelRepository;
    public HostelsController(
        IGenericRepository<HostelEntity> hostelRepository)
    {
        _hostelRepository = hostelRepository;
    }
    [HttpPost("create-hostel")]
    public async Task<IActionResult> CreateHostel(CreateHostelRequest createHostelRequest) {
        HostelEntity hostel = Mapper.Map<HostelEntity>(createHostelRequest);
        hostel.OwnerId = GetUserID();
        await _hostelRepository.CreateAsync(hostel);
        return Ok(hostel);
    }
}
