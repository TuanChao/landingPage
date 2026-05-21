using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZwcadVietnam.Api.Data;
using ZwcadVietnam.Api.Models;

namespace ZwcadVietnam.Api.Controllers;

[ApiController]
[Route("api/page-views")]
public class PageViewsController : ControllerBase
{
    private readonly AppDbContext _db;
    public PageViewsController(AppDbContext db) { _db = db; }

    public record LogBody(string Slug, string? Variant);

    // Public: ghi 1 lượt view (fire-and-forget từ FE).
    [HttpPost]
    public async Task<IActionResult> Log([FromBody] LogBody body)
    {
        if (string.IsNullOrWhiteSpace(body.Slug)) return BadRequest();
        var view = new PageView
        {
            Slug = body.Slug,
            Variant = body.Variant,
            Referer = Request.Headers.Referer.ToString(),
            UserAgent = Request.Headers.UserAgent.ToString(),
        };
        _db.PageViews.Add(view);
        await _db.SaveChangesAsync();
        return Ok(new { ok = true });
    }

    // Admin: thống kê tổng/last 7d/last 30d theo slug.
    [HttpGet("stats"), Authorize]
    public async Task<IActionResult> Stats()
    {
        var now = DateTime.UtcNow;
        var d7 = now.AddDays(-7);
        var d30 = now.AddDays(-30);
        var raw = await _db.PageViews
            .GroupBy(v => v.Slug)
            .Select(g => new {
                Slug = g.Key,
                Total = g.Count(),
                Last7 = g.Count(v => v.CreatedAt >= d7),
                Last30 = g.Count(v => v.CreatedAt >= d30),
                A = g.Count(v => v.Variant == "A"),
                B = g.Count(v => v.Variant == "B"),
            })
            .ToListAsync();
        return Ok(raw);
    }

    // Admin: log chi tiết của 1 slug (limit 200 gần nhất).
    [HttpGet("by-slug/{slug}"), Authorize]
    public async Task<IActionResult> BySlug(string slug)
    {
        var list = await _db.PageViews.AsNoTracking()
            .Where(v => v.Slug == slug)
            .OrderByDescending(v => v.CreatedAt)
            .Take(200)
            .ToListAsync();
        return Ok(list);
    }

    // Admin: aggregate theo ngày trong N ngày gần nhất. Optional slug.
    [HttpGet("daily"), Authorize]
    public async Task<IActionResult> Daily([FromQuery] int days = 30, [FromQuery] string? slug = null)
    {
        days = Math.Clamp(days, 1, 365);
        var from = DateTime.UtcNow.Date.AddDays(-days + 1);
        var q = _db.PageViews.AsNoTracking().Where(v => v.CreatedAt >= from);
        if (!string.IsNullOrWhiteSpace(slug)) q = q.Where(v => v.Slug == slug);

        var grouped = await q
            .GroupBy(v => new { Date = v.CreatedAt.Date, v.Variant })
            .Select(g => new { Date = g.Key.Date, Variant = g.Key.Variant, Count = g.Count() })
            .ToListAsync();

        // Fill missing days (mỗi ngày tổng + A + B).
        var result = new List<object>();
        for (int i = 0; i < days; i++)
        {
            var d = from.AddDays(i);
            var hits = grouped.Where(x => x.Date == d).ToList();
            result.Add(new {
                date = d.ToString("yyyy-MM-dd"),
                total = hits.Sum(x => x.Count),
                a = hits.Where(x => x.Variant == "A").Sum(x => x.Count),
                b = hits.Where(x => x.Variant == "B").Sum(x => x.Count),
            });
        }
        return Ok(result);
    }
}
