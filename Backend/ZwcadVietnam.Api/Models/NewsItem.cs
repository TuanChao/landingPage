namespace ZwcadVietnam.Api.Models;

public class NewsItem : BaseEntity
{
    public string Slug { get; set; } = "";
    public string Title { get; set; } = "";
    public string? Category { get; set; }
    public string? Excerpt { get; set; }
    public string? Content { get; set; }
    public string? Image { get; set; }
    public DateTime? PublishedAt { get; set; }
}
