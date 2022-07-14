using Api.UserFeatures.Requests;
using Application.Exceptions;
using Application.Extensions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Models;
using Domain.Entities;
using Domain.Entities.Hostel;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest;


// [Authorize(Roles = nameof(Role.Owner))]
public class HostelManagementsController:BaseRestController
{
    private readonly IAuthorizationServices _authorizationServices;
    private readonly IGenericRepository<UserEntity> _userRepo;
    private readonly IGenericRepository<HostelEntity> _hostelRepo;
    private readonly IGenericRepository<HostelManagement> _managementRepo;
    private readonly IMailService _mailService;
    private readonly IAssignmentService _assignmentService;

    public HostelManagementsController(IAuthorizationServices authorizationServices, IGenericRepository<UserEntity> userRepo, IGenericRepository<HostelManagement> managementRepo, IMailService mailService, IAssignmentService assignmentService, IGenericRepository<HostelEntity> hostelRepo)
    {
        _authorizationServices = authorizationServices;
        _userRepo = userRepo;
        _managementRepo = managementRepo;
        _mailService = mailService;
        _assignmentService = assignmentService;
        _hostelRepo = hostelRepo;
    }

    [HttpPost("assign")]
    [Authorize(Roles = nameof(Role.Owner))]
    public async Task<IActionResult> AssignManagerIntoHostel(AssignManagerRequest request)
    {
        var hostel = await _hostelRepo.FirstOrDefaultAsync(e => e.Id.Equals(request.HostelId));
        if (hostel is null) throw new BadRequestException("Invalid hostelId");
        var invitor = await _userRepo.FirstOrDefaultAsync(e => e.Id.Equals(CurrentUserID));
        var isValid = await _authorizationServices.IsHostelManagedByCurrentUser(request.HostelId, CurrentUserID);
        if (!isValid)
        {
            throw new BadRequestException("HostelId is not valid");
        }
        var target = await _userRepo.FirstOrDefaultAsync(e => e.Email.Equals(request.Email));
        if (target is null) throw new BadRequestException("Email does not exist in the system");
        var origin = Request.Headers["Origin"];
        if (string.IsNullOrEmpty(origin))
            origin = MyHttpContext.AppBaseUrl;
        var mail = await _assignmentService.CreateInvitationMail(target, invitor, hostel, origin);
        _mailService.SendMailSync(mail);
        return Ok("Send invitation mail successfully!");
    }

    [HttpGet("confirm")]
    [Authorize(Roles =  nameof(Role.Manager))]
    public async Task<IActionResult> ConfirmManager([FromQuery] ConfirmManagerRequest request)
    {
        var isAccept = await _assignmentService.AcceptInvitation(request.Token);
        if (!isAccept) throw new BadRequestException("Something went wrongs!");
        return Ok("Accept invitation successfully!");
    }
    
    [HttpPost("remove")]
    [Authorize(Roles = nameof(Role.Owner))]
    public async Task<IActionResult> RemoveManageFromHostel(RemoveManagerFromHostelRequest request)
    {
        var isValid = await _authorizationServices.IsHostelManagedByCurrentUser(request.HostelId, CurrentUserID);
        if (!isValid)
        {
            throw new BadRequestException("HostelId is not valid");
        }

        var target = await _userRepo.FirstOrDefaultAsync(e => e.Id.Equals(request.ManagerId));
        if (target is null) throw new BadRequestException("User does not exist in the system");
        var targetDelete = await _managementRepo.FirstOrDefaultAsync(e =>
            e.ManagerId.Equals(target.Id) && e.HostelId.Equals(request.HostelId));
        if (targetDelete is null) throw new BadRequestException("Somethings went wrongs!");
        await _managementRepo.DeleteSoftAsync(targetDelete);
        return Ok("Success");
    }
    
}