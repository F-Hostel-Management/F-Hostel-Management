using Application.Interfaces;
using Api.UserFeatures.Requests;
using Api.UserFeatures.Responses;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Api.Services;
using Domain.Enums;
using Domain.Constants;

namespace Api.Controllers;

public class UserController : BaseApiController
{
    private readonly JwtBuilderService jwtBuilderService;
    private readonly IUserRepository _userRepository;

    private List<UserEntity> _users = new List<UserEntity>()
    {
        new UserEntity(){ Phone ="owner", Password = "123", Role = Role.Owner},
        new UserEntity(){ Phone ="manager", Password = "123", Role = Role.Manager},
        new UserEntity(){ Phone ="tenant", Password = "123", Role = Role.Tenant}
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

    [Authorize(Roles = nameof(Role.Owner))]
    [HttpGet("GetOnwerInfo")]
    public ActionResult GetOnwerInfoAsync()
    {
        var user = HttpContext.User.FindFirst("id");
        return Ok(user.ToString());
    }

    [Authorize(Roles = nameof(Role.Manager))]
    [HttpGet("GetManagerInfo")]
    public ActionResult GetManagerInfoAsync()
    {
        var user = HttpContext.User.FindFirst("id");
        return Ok(user.ToString());
    }

    [Authorize(Roles = nameof(Role.Tenant))]
    [HttpGet("GetTenantInfo")]
    public ActionResult GetTenantInfoAsync()
    {
        var user = HttpContext.User.FindFirst("id");
        return Ok(user.ToString());
    }

    [Authorize(Policy = PolicyName.ONWER_AND_MANAGER)]
    [HttpGet("GetBothManagerAndOnwer")]
    public ActionResult GetBothManagerAndOnwer()
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
