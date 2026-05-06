using Microsoft.EntityFrameworkCore;
using ZwcadVietnam.Api.Models;

namespace ZwcadVietnam.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Banner> Banners => Set<Banner>();
    public DbSet<NewsItem> News => Set<NewsItem>();
    public DbSet<FaqItem> Faqs => Set<FaqItem>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<DownloadItem> Downloads => Set<DownloadItem>();
    public DbSet<ContactSubmission> Contacts => Set<ContactSubmission>();

    public override int SaveChanges()
    {
        TouchTimestamps();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken ct = default)
    {
        TouchTimestamps();
        return base.SaveChangesAsync(ct);
    }

    private void TouchTimestamps()
    {
        var now = DateTime.UtcNow;
        foreach (var entry in ChangeTracker.Entries<BaseEntity>())
        {
            if (entry.State == EntityState.Added) entry.Entity.CreatedAt = now;
            if (entry.State == EntityState.Added || entry.State == EntityState.Modified)
                entry.Entity.UpdatedAt = now;
        }
    }
}
