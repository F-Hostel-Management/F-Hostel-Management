using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Entities.Commitment;
using Quartz;

namespace Application.Services.CronService;
public class JoiningCodeJob : IJob
{
    private readonly IGenericRepository<JoiningCode> _jcRepository;
    private readonly IJoiningCodeServices _jcServices;
    public JoiningCodeJob(IGenericRepository<JoiningCode> jcRepository, IJoiningCodeServices jcServices)
    {
        _jcRepository = jcRepository;
        _jcServices = jcServices;
    }

    public async Task Execute(IJobExecutionContext context)
    {
        var joiningcodes = await _jcRepository.ListAsync();
        foreach (var jc in joiningcodes)
        {
            if (!_jcServices.IsValid(jc))
            {
                await _jcRepository.DeleteAsync(jc);
            }
        }
    }
}
