using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SaintsApi.Models
{
    public class Saint
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        public DateTime FeastDay { get; set; }
        
        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string Patronages { get; set; } = string.Empty;
    }
}