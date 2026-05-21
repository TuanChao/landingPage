using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZwcadVietnam.Api.Data;
using ZwcadVietnam.Api.Models;

namespace ZwcadVietnam.Api.Controllers;

[ApiController]
[Route("api/block-presets")]
public class BlockPresetsController : CrudControllerBase<BlockPreset>
{
    public BlockPresetsController(AppDbContext db) : base(db) { }
    protected override DbSet<BlockPreset> Set => Db.BlockPresets;
}
