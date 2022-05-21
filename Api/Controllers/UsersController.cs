using Api.UserFeatures.Requests;
using Api.UserFeatures.Responses;
using Application.Interfaces.IRepository;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Persistence.Repositories;

namespace Api.Controllers;
public class UsersController : BaseApiController
{
    private readonly GenericRepository<UserEntity> _userRepository;
    public UsersController(
        GenericRepository<UserEntity> userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet("get-all-users")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userRepository.ListAsync();
        return Ok(users);
    }

    [HttpGet("find-by-id/{Id}")]
    public async Task<IActionResult> GetUserById([FromRoute] GetByIdRequest request)
    {
        var user = await _userRepository.FindByIdAsync(request.Id);
        if (user == null)
        {
            return NotFound();
        }
        var response = Mapper.Map<GetByIdResponse>(user);
        return Ok(response);
    }

    [HttpPost("create-user")]
    public async Task<ActionResult> CreateUser([FromBody] CreateUserRequest request)
    {
        var newUser = new UserEntity
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Email = request.Email,
            Phone = request.Phone,
            // tmp
            Password = request.Password,
            Role = request.Role,
        };
        await _userRepository.CreateAsync(newUser);
        var response = Mapper.Map<GetByIdResponse>(newUser);
        return CreatedAtAction(nameof(CreateUser), new { Id = newUser.Id }, response);
    }

    [HttpPatch("update-user/{Id}")]
    public async Task<IActionResult> UpdateUserAsync(
        [FromRoute] GetByIdRequest requestId,
        [FromBody] UpdateUserRequest userDto
        )
    {
        var existing = await _userRepository.FindByIdAsync(requestId.Id);
        if (existing == null)
        {
            return NotFound();
        }
        
        var updated = Mapper.Map(userDto, existing);

        await _userRepository.UpdateAsync(updated, existing);
        var response = Mapper.Map<GetByIdResponse>(updated);
        return Ok(response);
    }

    [HttpDelete("delete-user/{Id}")]
    public async Task<IActionResult> DeleteUser([FromRoute] GetByIdRequest request)
    {
        var delUser = await _userRepository.DeleteAsync(request.Id);
        if (delUser == null)
        {
            return NotFound();
        }
        var response = Mapper.Map<GetByIdResponse>(delUser);
        return Ok(response);
    }

    [HttpGet("demo-get-tenant")]
    public IActionResult GetTenants()
    {
        var test = _userRepository.Where(e => e.Role == Role.Tenant);
        return Ok(test);
    }

}
