using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using ZwcadVietnam.Api.Data;
using ZwcadVietnam.Api.Models;

namespace ZwcadVietnam.Api.Controllers;

[ApiController]
[Route("api/products")]
public class ProductsController : CrudControllerBase<Product>
{
    public ProductsController(AppDbContext db) : base(db) { }
    protected override DbSet<Product> Set => Db.Products;
}
