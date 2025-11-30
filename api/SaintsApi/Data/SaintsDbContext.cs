using Microsoft.EntityFrameworkCore;
using SaintsApi.Models;

namespace SaintsApi.Data
{
    public class SaintsDbContext : DbContext
    {
        public SaintsDbContext(DbContextOptions<SaintsDbContext> options)
            : base(options) { }

        public DbSet<Saint> Saints { get; set; }
        public DbSet<History> History { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Explicitly configure Patronages as a regular string, not JSON
            modelBuilder.Entity<Saint>()
                .Property(s => s.Patronages)
                .HasColumnType("nvarchar(max)");
        }
    }
}
