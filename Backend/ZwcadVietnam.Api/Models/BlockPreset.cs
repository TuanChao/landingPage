namespace ZwcadVietnam.Api.Models;

public class BlockPreset : BaseEntity
{
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public string? Thumbnail { get; set; }   // ảnh đại diện
    // Puck Data JSON (cùng cấu trúc với Page.Data) — chứa một group block để chèn vào trang.
    public string Data { get; set; } = "{}";
}
