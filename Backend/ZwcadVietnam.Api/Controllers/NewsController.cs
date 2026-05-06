using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using ZwcadVietnam.Api.Data;
using ZwcadVietnam.Api.Models;

namespace ZwcadVietnam.Api.Controllers;

[ApiController]
[Route("api/news")]
public class NewsController : CrudControllerBase<NewsItem>
{
    public NewsController(AppDbContext db) : base(db) { }
    protected override DbSet<NewsItem> Set => Db.News;
}
