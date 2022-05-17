using Application.Interfaces;
using Api.UserFeatures.Requests;
using Api.UserFeatures.Responses;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class UserController : BaseApiController
{
    private readonly IUserRepository _userRepository;

    public UserController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet("{Id}")]
    public async Task<ActionResult<GetByIdResponse>> GetByIdAsync(
        [FromRoute] GetByIdRequest request
    )
    {
        var user = await _userRepository.FindByIdAsync(request.Id);
        if (user == null)
            return NotFound();

        var response = Mapper.Map<GetByIdResponse>(user);
        return Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult> CreateAsync(CreateUserRequest request)
    {
        var newUser = new UserEntity
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Email = request.Email,
            Phone = request.Phone,
            Password = request.Password,
            Role = request.Role,
        };
        await _userRepository.CreateAsync(newUser);
        return CreatedAtAction(nameof(GetByIdAsync), new { Id = newUser.Id }, newUser);
    }
}
