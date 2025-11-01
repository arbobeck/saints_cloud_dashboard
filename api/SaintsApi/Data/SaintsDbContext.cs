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
    }
}