using Microsoft.AspNetCore.Mvc;
using SaintsApi.Services;

namespace SaintsApi.Controllers
{
    [ApiController]
    [Route("api/blog")]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [HttpGet("posts")]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _blogService.GetPublishedPostsAsync(); // You need to implement this
            return Ok(posts);
        }

        [HttpGet("posts/{slug}")]
        public async Task<IActionResult> GetPostBySlug(string slug)
        {
            var post = await _blogService.GetPostBySlugAsync(slug); // You need to implement this
            if (post == null)
                return NotFound(new { message = "Post not found" });

            return Ok(post);
        }
    }
}
