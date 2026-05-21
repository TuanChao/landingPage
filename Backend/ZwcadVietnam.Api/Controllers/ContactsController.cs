using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZwcadVietnam.Api.Data;
using ZwcadVietnam.Api.Models;

namespace ZwcadVietnam.Api.Controllers;

[ApiController]
[Route("api/contacts")]
public class ContactsController : ControllerBase
{
    private readonly AppDbContext _db;
    public ContactsController(AppDbContext db) { _db = db; }

    // Public: form trên landing / LeadForm trong trang tùy biến gửi liên hệ.
    // Message KHÔNG bắt buộc (LeadForm có thể chỉ name+email+tag).
    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] ContactSubmission body)
    {
        if (string.IsNullOrWhiteSpace(body.Name) || string.IsNullOrWhiteSpace(body.Email))
            return BadRequest(new { error = "Thiếu họ tên hoặc email" });

        body.Id = 0;
        body.Status = "new";
        body.Message ??= "";
        _db.Contacts.Add(body);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = body.Id }, new { ok = true });
    }

    // Admin: trả về danh sách tag riêng biệt để filter dropdown.
    [HttpGet("tags"), Authorize]
    public async Task<IActionResult> Tags()
    {
        var tags = await _db.Contacts
            .Where(c => c.Tag != null && c.Tag != "")
            .Select(c => c.Tag!)
            .Distinct()
            .OrderBy(t => t)
            .ToListAsync();
        return Ok(tags);
    }

    // Admin: số lead per (slug, variant) — input cho conversion rate ở Analytics.
    [HttpGet("conversions"), Authorize]
    public async Task<IActionResult> Conversions()
    {
        var data = await _db.Contacts.AsNoTracking()
            .Where(c => c.SourceSlug != null && c.SourceSlug != "")
            .GroupBy(c => new { Slug = c.SourceSlug!, c.SourceVariant })
            .Select(g => new { slug = g.Key.Slug, variant = g.Key.SourceVariant, leads = g.Count() })
            .ToListAsync();
        return Ok(data);
    }

    public record BulkBody(int[] Ids, string? Status);

    [HttpPatch("bulk-status"), Authorize]
    public async Task<IActionResult> BulkStatus([FromBody] BulkBody body)
    {
        if (body.Ids is null || body.Ids.Length == 0 || string.IsNullOrEmpty(body.Status))
            return BadRequest();
        var items = await _db.Contacts.Where(c => body.Ids.Contains(c.Id)).ToListAsync();
        foreach (var c in items) c.Status = body.Status;
        await _db.SaveChangesAsync();
        return Ok(new { updated = items.Count });
    }

    [HttpPost("bulk-delete"), Authorize]
    public async Task<IActionResult> BulkDelete([FromBody] BulkBody body)
    {
        if (body.Ids is null || body.Ids.Length == 0) return BadRequest();
        var items = await _db.Contacts.Where(c => body.Ids.Contains(c.Id)).ToListAsync();
        _db.Contacts.RemoveRange(items);
        await _db.SaveChangesAsync();
        return Ok(new { deleted = items.Count });
    }

    [HttpGet, Authorize]
    public async Task<IActionResult> List() =>
        Ok(await _db.Contacts.AsNoTracking().OrderByDescending(c => c.CreatedAt).ToListAsync());

    [HttpGet("{id:int}"), Authorize]
    public async Task<IActionResult> Get(int id)
    {
        var item = await _db.Contacts.FindAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    public record StatusUpdate(string Status);

    [HttpPatch("{id:int}"), Authorize]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] StatusUpdate body)
    {
        var item = await _db.Contacts.FindAsync(id);
        if (item is null) return NotFound();
        item.Status = body.Status;
        await _db.SaveChangesAsync();
        return Ok(item);
    }

    [HttpDelete("{id:int}"), Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _db.Contacts.FindAsync(id);
        if (item is null) return NotFound();
        _db.Contacts.Remove(item);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
