using Application.Interfaces;
using Domain.Entities;

namespace Application.Services;

public class AssignmentService : IAssignmentService
{
    public Task<string> CreateInvitationMail(UserEntity target, UserEntity invitor, HostelEntity hostelEntity)
    {
        throw new NotImplementedException();
    }

    public Task<bool> AcceptInvitation(string token)
    {
        throw new NotImplementedException();
    }
}