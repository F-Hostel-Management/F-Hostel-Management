using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Services.CronService;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Quartz;

namespace Api.Controllers.Rest
{
    public class TestController:BaseRestController
    {
        private readonly IGenericRepository<UserEntity> _userRepository;
        private readonly ITokenService _tokenService;
        private readonly ISchedulerFactory _schedulerFactory;

        public TestController(IGenericRepository<UserEntity> userRepository, ITokenService tokenService, ISchedulerFactory schedulerFactory = null)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
            _schedulerFactory = schedulerFactory;
        }

        [HttpGet]
        public async Task<IActionResult> Get(Guid id)
        {
            var user = await _userRepository.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
                return BadRequest();
            return Ok(_tokenService.GetToken(user));
        }

        [HttpGet("trigger")]
        public async Task<IActionResult> Trigger()
        {
            var scheduler = await _schedulerFactory.GetScheduler();
            await scheduler.TriggerJob(CronJobKeys.InvoiceSchedule);
            return Ok();
        }
    }
}
