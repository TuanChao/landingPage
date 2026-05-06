using ZwcadVietnam.Api.Models;

namespace ZwcadVietnam.Api.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext db)
    {
        if (!db.Banners.Any())
        {
            db.Banners.AddRange(
                new Banner { Title = "ZWCAD - Giải pháp CAD chuyên nghiệp", Subtitle = "Tương thích DWG hoàn hảo, hiệu năng vượt trội", Image = "/image-zwcad/zwcad/bg-section.png", CtaLabel = "Tải về dùng thử", CtaHref = "/tai-ve/zwcad-trial", Order = 1, Active = true },
                new Banner { Title = "ZW3D - CAD/CAM 3D toàn diện", Subtitle = "Thiết kế và gia công cơ khí trong một nền tảng", Image = "/image-zwcad/zwcad/bg-section.png", CtaLabel = "Khám phá ZW3D", CtaHref = "/san-pham/zw3d", Order = 2, Active = true }
            );
        }
        db.SaveChanges();
    }
}
