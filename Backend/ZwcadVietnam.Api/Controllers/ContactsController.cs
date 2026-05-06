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

    // Public: form trên landing gửi liên hệ
    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] ContactSubmission body)
    {
        if (string.IsNullOrWhiteSpace(body.Name) || string.IsNullOrWhiteSpace(body.Email) || string.IsNullOrWhiteSpace(body.Message))
            return BadRequest(new { error = "Thiếu trường bắt buộc" });

        body.Id = 0;
        body.Status = "new";
        _db.Contacts.Add(body);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = body.Id }, new { ok = true });
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
