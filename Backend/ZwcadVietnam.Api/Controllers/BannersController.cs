using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZwcadVietnam.Api.Data;
using ZwcadVietnam.Api.Models;

namespace ZwcadVietnam.Api.Controllers;

[ApiController]
[Route("api/banners")]
public class BannersController : CrudControllerBase<Banner>
{
    public BannersController(AppDbContext db) : base(db) { }
    protected override DbSet<Banner> Set => Db.Banners;
}
