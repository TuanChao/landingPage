using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZwcadVietnam.Api.Data;
using ZwcadVietnam.Api.Models;

namespace ZwcadVietnam.Api.Controllers;

public abstract class CrudControllerBase<T> : ControllerBase where T : BaseEntity
{
    protected readonly AppDbContext Db;
    protected abstract DbSet<T> Set { get; }

    protected CrudControllerBase(AppDbContext db) { Db = db; }

    [HttpGet]
    public virtual async Task<IActionResult> List() => Ok(await Set.AsNoTracking().ToListAsync());

    [HttpGet("{id:int}")]
    public virtual async Task<IActionResult> Get(int id)
    {
        var item = await Set.FindAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost, Authorize]
    public virtual async Task<IActionResult> Create([FromBody] T entity)
    {
        entity.Id = 0;
        Set.Add(entity);
        await Db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = entity.Id }, entity);
    }

    [HttpPut("{id:int}"), Authorize]
    public virtual async Task<IActionResult> Update(int id, [FromBody] T entity)
    {
        var existing = await Set.FindAsync(id);
        if (existing is null) return NotFound();
        Db.Entry(existing).CurrentValues.SetValues(entity);
        existing.Id = id;
        await Db.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id:int}"), Authorize]
    public virtual async Task<IActionResult> Delete(int id)
    {
        var existing = await Set.FindAsync(id);
        if (existing is null) return NotFound();
        Set.Remove(existing);
        await Db.SaveChangesAsync();
        return NoContent();
    }
}
