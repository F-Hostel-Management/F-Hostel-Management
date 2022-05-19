using Domain.Entities;
using Infrastructure.Configurations;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Api.Services
{
    public class JwtBuilderService
    {
        private IOptions<AppSettings> _appSettings;

        public JwtBuilderService(IOptions<AppSettings> appSettings)
        {
            this._appSettings = appSettings;
        }

        //testing purpose
        public string GenerateJSONWebToken(UserEntity user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Value.JwtSetting.IssuerSigningKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
                new Claim("id", user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };
            var token = new JwtSecurityToken(_appSettings.Value.JwtSetting.ValidIssuer,
             _appSettings.Value.JwtSetting.ValidAudience,
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
