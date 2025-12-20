using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SaintsApi.Models
{
    [Table("BlogDrafts")]
    public class BlogDraft
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(255)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(255)]
        public string Slug { get; set; } = string.Empty;
        
        [Required]
        public string Content { get; set; } = string.Empty;
        
        [MaxLength(100)]
        public string Author { get; set; } = "Admin";
        
        [MaxLength(20)]
        public string Status { get; set; } = "draft";
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? PublishedAt { get; set; }
    }
}