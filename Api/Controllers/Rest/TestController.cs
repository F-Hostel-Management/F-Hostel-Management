using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest
{
    public class TestController:BaseRestController
    {
        private readonly IGenericRepository<UserEntity> _userRepository;
        private readonly ITokenService _tokenService;

        public TestController(IGenericRepository<UserEntity> userRepository, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(Guid id)
        {
            var user = await _userRepository.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
                return BadRequest();
            return Ok(_tokenService.GetToken(user));
        }
    }
}
