namespace ZwcadVietnam.Api.Models;

public class Banner : BaseEntity
{
    public string Title { get; set; } = "";        // vi (default)
    public string? TitleEn { get; set; }
    public string? TitleZh { get; set; }
    public string? Subtitle { get; set; }
    public string? SubtitleEn { get; set; }
    public string? SubtitleZh { get; set; }
    public string Image { get; set; } = "";
    public string? CtaLabel { get; set; }
    public string? CtaLabelEn { get; set; }
    public string? CtaLabelZh { get; set; }
    public string? CtaHref { get; set; }
    public int Order { get; set; }
    public bool Active { get; set; } = true;
}
