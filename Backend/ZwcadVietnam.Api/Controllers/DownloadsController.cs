using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using ZwcadVietnam.Api.Data;
using ZwcadVietnam.Api.Models;

namespace ZwcadVietnam.Api.Controllers;

[ApiController]
[Route("api/downloads")]
public class DownloadsController : CrudControllerBase<DownloadItem>
{
    public DownloadsController(AppDbContext db) : base(db) { }
    protected override DbSet<DownloadItem> Set => Db.Downloads;
}
