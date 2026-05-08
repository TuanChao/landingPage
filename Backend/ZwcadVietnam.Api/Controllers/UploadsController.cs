using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ZwcadVietnam.Api.Controllers;

[ApiController]
[Route("api/uploads")]
[Authorize]
public class UploadsController : ControllerBase
{
    private static readonly Dictionary<string, string[]> AllowedByCategory = new(StringComparer.OrdinalIgnoreCase)
    {
        ["image"]   = new[] { ".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg" },
        ["installer"] = new[] { ".zip", ".rar", ".7z", ".exe", ".msi" },
        ["doc"]     = new[] { ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".txt" },
    };

    private static readonly string[] AllAllowed = AllowedByCategory.Values.SelectMany(x => x).ToArray();

    [HttpPost]
    [RequestSizeLimit(2L * 1024 * 1024 * 1024)] // 2 GB cho file cài đặt
    [RequestFormLimits(MultipartBodyLengthLimit = 2L * 1024 * 1024 * 1024)]
    public async Task<IActionResult> Upload([FromForm] IFormFile file, [FromQuery] string? category = null)
    {
        if (file is null || file.Length == 0)
            return BadRequest(new { error = "Chưa có file" });

        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (string.IsNullOrEmpty(ext))
            return BadRequest(new { error = "File không có phần mở rộng" });

        var allowed = !string.IsNullOrWhiteSpace(category) && AllowedByCategory.TryGetValue(category, out var list)
            ? list
            : AllAllowed;

        if (!allowed.Contains(ext))
            return BadRequest(new { error = $"Định dạng {ext} không được phép", allowed });

        var subDir = category switch
        {
            "image" => "images",
            "installer" => "installers",
            "doc" => "docs",
            _ => "files",
        };

        var uploadsDir = Path.Combine(Directory.GetCurrentDirectory(), "uploads", subDir);
        Directory.CreateDirectory(uploadsDir);

        var safeName = Path.GetFileNameWithoutExtension(file.FileName)
            .Replace(" ", "-")
            .Replace("/", "-")
            .Replace("\\", "-");
        var filename = $"{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}-{safeName}{ext}";
        var fullPath = Path.Combine(uploadsDir, filename);

        await using (var stream = System.IO.File.Create(fullPath))
        {
            await file.CopyToAsync(stream);
        }

        return Ok(new
        {
            url = $"/uploads/{subDir}/{filename}",
            filename,
            originalName = file.FileName,
            size = file.Length,
            mime = file.ContentType,
            category = subDir,
        });
    }
}
