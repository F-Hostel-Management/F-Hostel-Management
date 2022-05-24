using Api.UserFeatures.Requests;
using Api.UserFeatures.Responses;
using Application.Interfaces.IRepository;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence.Repositories;

namespace Api.Controllers;

[Authorize]
public class UsersController : BaseApiController
{
    private readonly IGenericRepository<UserEntity> _userRepository;
    public UsersController(
        IGenericRepository<UserEntity> userRepository)
    {
        _userRepository = userRepository;
    }
    
    [HttpGet("get-info")]
    public IActionResult GetInfo()
    {
        return Ok(HttpContext.User.Claims.Select(e => e.Value).ToList());
    }

    [HttpPatch("update-info")]
    public async Task<IActionResult> UpdateInfo(UpdateUserRequest updateUserRequest)
    {

        return Ok();
    }

}
