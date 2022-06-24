using Application.Interfaces.IRepository;
using Domain.Entities.Commitment;
using Domain.Enums;
using Quartz;

namespace Application.Services.CronService;
public class CommitmentJob : IJob
{
    private readonly IGenericRepository<CommitmentEntity> _commitmentRepository;

    public CommitmentJob(IGenericRepository<CommitmentEntity> commitmentRepository)
    {
        _commitmentRepository = commitmentRepository;

    }

    public async Task Execute(IJobExecutionContext context)
    {
        var commitments = await _commitmentRepository.WhereAsync(com =>
                          com.EndDate <= DateTime.Now);
        foreach (var commitment in commitments)
        {
            commitment.CommitmentStatus = CommitmentStatus.Expired;
        }
        await _commitmentRepository.UpdateRangeAsync(commitments);
    }
}
