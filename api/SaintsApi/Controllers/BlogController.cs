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
            return Ok(await _blogService.GetPublishedPostsAsync());
        }

        [HttpGet("posts/{slug}")]
        public async Task<IActionResult> GetPostBySlug(string slug)
        {
            var post = await _blogService.GetPostBySlugAsync(slug);
            return post == null ? NotFound() : Ok(post);
        }
    }
}
