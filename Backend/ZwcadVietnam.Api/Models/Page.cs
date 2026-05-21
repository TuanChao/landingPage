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

    // A/B test: nếu DataB khác null thì random hiển thị A/B theo VariantBWeight (0-100, % chọn B).
    public string? DataB { get; set; }
    public int VariantBWeight { get; set; } = 50;
}
