using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaintsApi.DTOs;
using SaintsApi.Services;

namespace SaintsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public AdminController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [HttpGet("drafts")]
        public async Task<IActionResult> GetAllDrafts()
        {
            var drafts = await _blogService.GetAllDraftsAsync();
            return Ok(drafts);
        }

        [HttpGet("drafts/{id}")]
        public async Task<IActionResult> GetDraft(int id)
        {
            var draft = await _blogService.GetDraftByIdAsync(id);
            
            if (draft == null)
            {
                return NotFound(new { message = "Draft not found" });
            }

            return Ok(draft);
        }

        [HttpPost("drafts")]
        public async Task<IActionResult> CreateDraft([FromBody] CreateDraftRequest request)
        {
            var draft = await _blogService.CreateDraftAsync(request);
            return CreatedAtAction(nameof(GetDraft), new { id = draft.Id }, draft);
        }

        [HttpPut("drafts/{id}")]
        public async Task<IActionResult> UpdateDraft(int id, [FromBody] UpdateDraftRequest request)
        {
            var draft = await _blogService.UpdateDraftAsync(id, request);
            
            if (draft == null)
            {
                return NotFound(new { message = "Draft not found" });
            }

            return Ok(draft);
        }

        [HttpDelete("drafts/{id}")]
        public async Task<IActionResult> DeleteDraft(int id)
        {
            var result = await _blogService.DeleteDraftAsync(id);
            
            if (!result)
            {
                return NotFound(new { message = "Draft not found" });
            }

            return NoContent();
        }
    }
}