namespace ZwcadVietnam.Api.Models;

public class NewsItem : BaseEntity
{
    public string Slug { get; set; } = "";
    public string Title { get; set; } = "";        // vi (default)
    public string? TitleEn { get; set; }
    public string? TitleZh { get; set; }
    public string? Category { get; set; }
    public string? Excerpt { get; set; }           // vi
    public string? ExcerptEn { get; set; }
    public string? ExcerptZh { get; set; }
    public string? Content { get; set; }           // vi
    public string? ContentEn { get; set; }
    public string? ContentZh { get; set; }
    public string? Image { get; set; }
    public DateTime? PublishedAt { get; set; }
}
