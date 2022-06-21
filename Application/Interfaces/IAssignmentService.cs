using Application.Models;
using Domain.Entities;

namespace Application.Interfaces;

public interface IAssignmentService
{
    Task<MailRequest> CreateInvitationMail(UserEntity target, UserEntity invitor, HostelEntity hostelEntity, string origin);
    Task<bool> AcceptInvitation(string token);
}