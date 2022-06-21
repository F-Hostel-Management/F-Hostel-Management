using System.Security.Claims;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Models;
using Domain.Entities;
using Domain.Entities.Hostel;

namespace Application.Services;

public class AssignmentService : IAssignmentService
{
    private readonly ITokenService _tokenService;
    private readonly IGenericRepository<HostelManagement> _hostelManagementRepo;

    public AssignmentService(ITokenService tokenService, IGenericRepository<HostelManagement> hostelManagementRepo)
    {
        _tokenService = tokenService;
        _hostelManagementRepo = hostelManagementRepo;
    }

    public async Task<MailRequest> CreateInvitationMail(UserEntity target, UserEntity invitor,
        HostelEntity hostelEntity)
    {
        var checkExistInHostel = await _hostelManagementRepo.FirstOrDefaultAsync(e =>
            e.HostelId.Equals(hostelEntity.Id) && e.ManagerId.Equals(target.Id));
        if (checkExistInHostel is not null)
            throw new BadRequestException("This email already existed in hostel!");
        AssignmentPayload payload = new AssignmentPayload();
        payload.Inviter = invitor.Id;
        payload.HostelId = hostelEntity.Id;
        payload.TargetId = target.Id;
        var token = _tokenService.GenerateAssignmentToken(payload);
        var mail = new MailRequest();
        mail.Subject = "[F-Hostel] You are invited to be an manager!";
        mail.ToEmail = target.Email;
        var body = $"{invitor.Name} invite you to be an manager at {invitor.Name}'s hostel." +
                   $"If you accept, then click on the link to confirm. This link will be expired in 1 days." +
                   $"Link: {token}";
        mail.Body = body;
        return mail;
    }

    public async Task<bool> AcceptInvitation(string token)
    {
        var claims = _tokenService.DecodeAndValidateToken(token);
        if (claims is null) throw new BadRequestException("The invitation is expired or not valid!");
        var enumerable = claims as Claim[] ?? claims.ToArray();
        var hostelId = (enumerable.FirstOrDefault(e => e.Type.Equals("hostelId"))?.Value);
        var targetId = enumerable.FirstOrDefault(e => e.Type.Equals("targetId"))?.Value;
        if (hostelId is null || targetId is null) throw new BadRequestException("Payload is not valid");
        var checkExistInHostel = await _hostelManagementRepo.FirstOrDefaultAsync(e =>
            e.HostelId.Equals(hostelId) && e.ManagerId.Equals(targetId));
        if (checkExistInHostel is not null)
            throw new BadRequestException("The invitation is expired because the user already managed the hostel!");
        var management = new HostelManagement();
        management.HostelId = new Guid(hostelId);
        management.ManagerId = new Guid(targetId);
        await _hostelManagementRepo.CreateAsync(management);
        return true;
    }
}