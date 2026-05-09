namespace ZwcadVietnam.Api.Models;

public class DownloadItem : BaseEntity
{
    public string Slug { get; set; } = "";
    public string Title { get; set; } = "";        // vi (default)
    public string? TitleEn { get; set; }
    public string? TitleZh { get; set; }
    public string? ProductSlug { get; set; }
    public string? Version { get; set; }
    public string FileUrl { get; set; } = "";
    public string? FileSize { get; set; }
}
