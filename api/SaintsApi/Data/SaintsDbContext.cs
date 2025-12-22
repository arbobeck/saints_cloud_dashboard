using Microsoft.EntityFrameworkCore;
using SaintsApi.Models;

namespace SaintsApi.Data;

public class SaintsDbContext : DbContext
{
    public SaintsDbContext(DbContextOptions<SaintsDbContext> options) : base(options)
    {
    }

    public DbSet<Saint> Saints { get; set; }
    public DbSet<History> History { get; set; }
    public DbSet<AdminUser> AdminUsers { get; set; }
    public DbSet<BlogDraft> BlogDrafts { get; set; }
    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Saint>(entity =>
        {
            entity.ToTable("Saints");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired();
            entity.Property(e => e.FeastDay).HasColumnType("date").IsRequired();
            entity.Property(e => e.Patronages).IsRequired();
        });

        modelBuilder.Entity<History>(entity =>
        {
            entity.ToTable("History");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired();
            entity.Property(e => e.Year).IsRequired();
        });
        modelBuilder.Entity<AdminUser>().ToTable("AdminUser");
        modelBuilder.Entity<BlogDraft>().ToTable("BlogDrafts");
    }
}
