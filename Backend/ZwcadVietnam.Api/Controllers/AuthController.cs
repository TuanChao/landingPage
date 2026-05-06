using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace ZwcadVietnam.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
    public AuthController(IConfiguration config) { _config = config; }

    public record LoginRequest(string Email, string Password);
    public record HashRequest(string Password);

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest body)
    {
        var adminEmail = _config["Admin:Email"];
        var hash = _config["Admin:PasswordHash"];
        if (string.IsNullOrEmpty(adminEmail) || string.IsNullOrEmpty(hash))
            return StatusCode(500, new { error = "Admin chưa được cấu hình" });

        if (body.Email != adminEmail) return Unauthorized(new { error = "Sai email hoặc mật khẩu" });
        if (!BCrypt.Net.BCrypt.Verify(body.Password, hash))
            return Unauthorized(new { error = "Sai email hoặc mật khẩu" });

        var secret = _config["Jwt:Secret"] ?? "dev-secret";
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            claims: new[] { new Claim(ClaimTypes.Email, body.Email) },
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds);

        return Ok(new
        {
            token = new JwtSecurityTokenHandler().WriteToken(token),
            user = new { email = body.Email }
        });
    }

    // Helper để generate password hash. Dùng 1 lần khi setup.
    [HttpPost("hash")]
    public IActionResult Hash([FromBody] HashRequest body)
    {
        return Ok(new { hash = BCrypt.Net.BCrypt.HashPassword(body.Password) });
    }
}
