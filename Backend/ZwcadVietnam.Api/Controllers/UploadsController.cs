using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ZwcadVietnam.Api.Controllers;

[ApiController]
[Route("api/uploads")]
[Authorize]
public class UploadsController : ControllerBase
{
    [HttpPost]
    [RequestSizeLimit(10 * 1024 * 1024)]
    public async Task<IActionResult> Upload(IFormFile file)
    {
        if (file is null || file.Length == 0) return BadRequest(new { error = "No file" });

        var uploadsDir = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
        Directory.CreateDirectory(uploadsDir);

        var safeName = Path.GetFileNameWithoutExtension(file.FileName)
            .Replace(" ", "-").Replace("/", "-");
        var ext = Path.GetExtension(file.FileName);
        var filename = $"{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}-{safeName}{ext}";
        var fullPath = Path.Combine(uploadsDir, filename);

        await using var stream = System.IO.File.Create(fullPath);
        await file.CopyToAsync(stream);

        return Ok(new
        {
            url = $"/uploads/{filename}",
            filename,
            size = file.Length,
            mime = file.ContentType
        });
    }
}
