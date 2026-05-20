using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZwcadVietnam.Api.Data;
using ZwcadVietnam.Api.Models;

namespace ZwcadVietnam.Api.Controllers;

[ApiController]
[Route("api/pages")]
public class PagesController : ControllerBase
{
    private readonly AppDbContext _db;
    public PagesController(AppDbContext db) { _db = db; }

    // Admin: list tất cả (cả draft) khi có token, public: chỉ published.
    [HttpGet]
    public async Task<IActionResult> List()
    {
        var isAdmin = User?.Identity?.IsAuthenticated == true;
        var query = _db.Pages.AsNoTracking();
        if (!isAdmin) query = query.Where(p => p.Published);
        return Ok(await query.OrderByDescending(p => p.UpdatedAt).ToListAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id)
    {
        var page = await _db.Pages.FindAsync(id);
        return page is null ? NotFound() : Ok(page);
    }

    // Public route để FE render trang theo slug.
    [HttpGet("by-slug/{slug}")]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var page = await _db.Pages.AsNoTracking().FirstOrDefaultAsync(p => p.Slug == slug && p.Published);
        return page is null ? NotFound() : Ok(page);
    }

    [HttpPost, Authorize]
    public async Task<IActionResult> Create([FromBody] Page page)
    {
        if (string.IsNullOrWhiteSpace(page.Slug) || string.IsNullOrWhiteSpace(page.Title))
            return BadRequest(new { error = "Slug và Title bắt buộc" });
        if (await _db.Pages.AnyAsync(p => p.Slug == page.Slug))
            return BadRequest(new { error = "Slug đã tồn tại" });

        page.Id = 0;
        if (string.IsNullOrWhiteSpace(page.Data)) page.Data = "{}";
        _db.Pages.Add(page);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = page.Id }, page);
    }

    [HttpPut("{id:int}"), Authorize]
    public async Task<IActionResult> Update(int id, [FromBody] Page page)
    {
        var existing = await _db.Pages.FindAsync(id);
        if (existing is null) return NotFound();
        if (existing.Slug != page.Slug
            && await _db.Pages.AnyAsync(p => p.Slug == page.Slug && p.Id != id))
            return BadRequest(new { error = "Slug đã tồn tại" });

        existing.Slug = page.Slug;
        existing.Title = page.Title;
        existing.TitleEn = page.TitleEn;
        existing.TitleZh = page.TitleZh;
        existing.Data = string.IsNullOrWhiteSpace(page.Data) ? "{}" : page.Data;
        existing.Published = page.Published;
        await _db.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id:int}"), Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var existing = await _db.Pages.FindAsync(id);
        if (existing is null) return NotFound();
        _db.Pages.Remove(existing);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
