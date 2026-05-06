namespace ZwcadVietnam.Api.Models;

public class Product : BaseEntity
{
    public string Name { get; set; } = "";
    public string Slug { get; set; } = "";
    public string Logo { get; set; } = "";
    public string Description { get; set; } = "";
    public string? Price { get; set; }
    public string? Badge { get; set; }
    public string? Version { get; set; }
}
