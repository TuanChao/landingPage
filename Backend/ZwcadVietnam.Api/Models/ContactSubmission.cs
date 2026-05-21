namespace ZwcadVietnam.Api.Models;

public class ContactSubmission : BaseEntity
{
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public string? Phone { get; set; }
    public string? Company { get; set; }
    public string Message { get; set; } = "";
    public string Status { get; set; } = "new"; // new | read | replied
    public string? Tag { get; set; } // dùng để phân loại lead theo LeadForm trên trang tùy biến

    // Nguồn lead — phục vụ tính conversion rate per page/variant.
    public string? SourceSlug { get; set; }
    public string? SourceVariant { get; set; }
}
