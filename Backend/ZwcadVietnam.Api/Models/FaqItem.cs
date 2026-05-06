namespace ZwcadVietnam.Api.Models;

public class FaqItem : BaseEntity
{
    public string Slug { get; set; } = "";
    public string Question { get; set; } = "";
    public string Answer { get; set; } = "";
    public int Order { get; set; }
}
