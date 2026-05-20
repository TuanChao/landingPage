namespace ZwcadVietnam.Api.Models;

public class Page : BaseEntity
{
    public string Slug { get; set; } = "";
    public string Title { get; set; } = "";        // vi
    public string? TitleEn { get; set; }
    public string? TitleZh { get; set; }
    // Puck editor JSON. Lưu dạng string (jsonb trong Postgres qua HasColumnType).
    public string Data { get; set; } = "{}";
    public bool Published { get; set; } = false;
}
