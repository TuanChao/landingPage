namespace ZwcadVietnam.Api.Models;

public class Banner : BaseEntity
{
    public string Title { get; set; } = "";
    public string? Subtitle { get; set; }
    public string Image { get; set; } = "";
    public string? CtaLabel { get; set; }
    public string? CtaHref { get; set; }
    public int Order { get; set; }
    public bool Active { get; set; } = true;
}
