using Application.AppConfig;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Models;

namespace Application.Services
{
    public class JwtBuilderService : ITokenService
    {
        private IOptions<AppSettings> _appSettings;
        private SigningCredentials _credentials;
        private SymmetricSecurityKey _securityKey;


        public JwtBuilderService(IOptions<AppSettings> appSettings)
        {
            this._appSettings = appSettings;
            SetupCredentials();
        }

        private void SetupCredentials()
        {
            _securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Value.JwtSetting.IssuerSigningKey));
            _credentials = new SigningCredentials(_securityKey, SecurityAlgorithms.HmacSha256);
        }

        public string GetToken(UserEntity user)
        {
            var claims = new[] {
                new Claim("id", user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };
            return new JwtSecurityTokenHandler().WriteToken(GenerateTokenByClaims(claims,  DateTime.Now.AddMinutes(120)));
        }

        private JwtSecurityToken GenerateTokenByClaims(IEnumerable<Claim> claims, DateTime expires)
        {
            return  new JwtSecurityToken(_appSettings.Value.JwtSetting.ValidIssuer,
                _appSettings.Value.JwtSetting.ValidAudience,
                claims,
                expires: expires,
                signingCredentials: _credentials);
        }

        public string GenerateAssignmentToken(AssignmentPayload assignmentPayload)
        {
            var claims = new[] {
                new Claim("HostelId", assignmentPayload.HostelId.ToString()),
                new Claim("TargetId", assignmentPayload.TargetId.ToString()),
                new Claim("Inviter", assignmentPayload.Inviter.ToString())
            };
            return new JwtSecurityTokenHandler().WriteToken(GenerateTokenByClaims(claims,  DateTime.Now.AddDays(1)));
        }

        public IEnumerable<Claim> DecodeAndValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = _securityKey,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                return jwtToken.Claims;
            }
            catch
            {
                return null;
            }
        }
    }
}
