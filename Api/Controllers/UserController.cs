using Application.Interfaces;
using Api.UserFeatures.Requests;
using Api.UserFeatures.Responses;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Api.Services;

namespace Api.Controllers;

public class UserController : BaseApiController
{
    private readonly JwtBuilderService jwtBuilderService;
    private readonly IUserRepository _userRepository;

    private List<UserEntity> _users = new List<UserEntity>()
    {
        new UserEntity(){ Phone ="0937046839", Password = "123", Role = Domain.Enums.Role.Owner}
    };

    public UserController(IUserRepository userRepository, JwtBuilderService jwtBuilderService)
    {
        _userRepository = userRepository;
        this.jwtBuilderService = jwtBuilderService;
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
    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult> LoginAsync(LoginRequest loginRequest)
    {
        var user = _users.FirstOrDefault(a => a.Phone == loginRequest.PhoneNumber);
        return Ok(jwtBuilderService.GenerateJSONWebToken(user));    
    }
    [Authorize]
    [HttpGet]
    public ActionResult GetInfoAsync()
    {
        var user = HttpContext.User.FindFirst("id");
        return Ok(user.ToString());
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
