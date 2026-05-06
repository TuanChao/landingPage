using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using ZwcadVietnam.Api.Data;
using ZwcadVietnam.Api.Models;

namespace ZwcadVietnam.Api.Controllers;

[ApiController]
[Route("api/faq")]
public class FaqController : CrudControllerBase<FaqItem>
{
    public FaqController(AppDbContext db) : base(db) { }
    protected override DbSet<FaqItem> Set => Db.Faqs;
}
