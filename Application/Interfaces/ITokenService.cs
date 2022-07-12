using Domain.Entities;
using System.Security.Claims;
using Application.Models;

namespace Application.Interfaces;

public interface ITokenService
{
    string GetToken(UserEntity user);
    string GenerateAssignmentToken(AssignmentPayload assignmentPayload);
    IEnumerable<Claim> DecodeAndValidateToken(string token);
}
