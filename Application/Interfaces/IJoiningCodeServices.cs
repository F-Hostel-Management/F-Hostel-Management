using Domain.Entities.Commitment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces;

public interface IJoiningCodeServices
{
    Task<JoiningCode> CreateJoiningCode(JoiningCode joiningCode);
    void ValidateJoiningCode(JoiningCode joiningCode);
    Task<CommitmentEntity> GetCommitment(JoiningCode joiningCode);
    Task<JoiningCode> GetJoiningCode(int digits);
}
