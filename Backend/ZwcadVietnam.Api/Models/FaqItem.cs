namespace ZwcadVietnam.Api.Models;

public class FaqItem : BaseEntity
{
    public string Slug { get; set; } = "";
    public string Question { get; set; } = "";     // vi (default)
    public string? QuestionEn { get; set; }
    public string? QuestionZh { get; set; }
    public string Answer { get; set; } = "";       // vi
    public string? AnswerEn { get; set; }
    public string? AnswerZh { get; set; }
    public int Order { get; set; }
}
