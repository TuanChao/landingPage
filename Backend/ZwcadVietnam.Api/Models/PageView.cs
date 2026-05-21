namespace ZwcadVietnam.Api.Models;

public class PageView : BaseEntity
{
    public string Slug { get; set; } = "";
    public string? Variant { get; set; }   // "A" hoặc "B" — phục vụ A/B analytics
    public string? Referer { get; set; }
    public string? UserAgent { get; set; }
}
