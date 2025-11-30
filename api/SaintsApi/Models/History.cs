using System.ComponentModel.DataAnnotations;

namespace SaintsApi.Models
{
    public class History
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int Year { get; set; }
    }
}
