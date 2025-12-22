namespace SaintsApi.Models
{
    public class BlogPost
    {
        public int Id { get; set; }

        public string Title { get; set; } = "";
        public string Slug { get; set; } = "";
        public string Content { get; set; } = "";
        public string Author { get; set; } = "Admin";

        public DateTime PublishedAt { get; set; }
    }
}
