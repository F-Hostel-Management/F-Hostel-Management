using Api.UserFeatures.Requests;
using Api.UserFeatures.Responses;
using Application.Interfaces;
using Ardalis.GuardClauses;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;
public class UsersController : BaseApiController
{
    private readonly IUserRepository _userRepository;
    public UsersController(
        IUserRepository userRepository)
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
    public async Task<ActionResult> CreateUser(CreateUserRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
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
    public async Task<IActionResult> UpdateUserById(
        [FromRoute] GetByIdRequest request,
        [FromBody] UpdateUserRequest updateRequest
        )
    {
        var newUser = new UserEntity
        {
            Name = updateRequest.Name,
            Email = updateRequest.Email,
            Phone = updateRequest.Phone,
        };

        var changedUser = await _userRepository.UpdateAsync(request.Id, newUser);
        if (changedUser == null)
        {
            return NotFound();
        }
        var response = Mapper.Map<GetByIdResponse>(changedUser);
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

}
