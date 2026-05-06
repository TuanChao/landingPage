namespace ZwcadVietnam.Api.Models;

public class ContactSubmission : BaseEntity
{
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public string? Phone { get; set; }
    public string? Company { get; set; }
    public string Message { get; set; } = "";
    public string Status { get; set; } = "new"; // new | read | replied
}
