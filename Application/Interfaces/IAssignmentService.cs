using Domain.Entities;

namespace Application.Interfaces;

public interface IAssignmentService
{
    Task<string> CreateInvitationMail(UserEntity target, UserEntity invitor, HostelEntity hostelEntity);
    Task<bool> AcceptInvitation(string token);
}