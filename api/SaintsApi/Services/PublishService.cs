using SaintsApi.Data;
using SaintsApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace SaintsApi.Services
{
    public interface IPublishService
    {
        Task<PublishResult> PublishDraftAsync(int draftId);
    }

    public class PublishResult
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string? CommitHash { get; set; }
    }

        public class PublishService : IPublishService
        {
            private readonly SaintsDbContext _context;
            private readonly IHttpClientFactory _httpClientFactory;
            private readonly IConfiguration _config;

            public PublishService(
                SaintsDbContext context,
                IHttpClientFactory httpClientFactory,
                IConfiguration config)
            {
                _context = context;
                _httpClientFactory = httpClientFactory;
                _config = config;
            }

            public async Task<PublishResult> PublishDraftAsync(int draftId)
            {
                var draft = await _context.BlogDrafts.FindAsync(draftId);
                if (draft == null)
                    return new PublishResult { Success = false, Message = "Draft not found" };

                // Prevent double-publish
                if (draft.Status == "published")
                    return new PublishResult { Success = true, Message = "Already published" };

                var post = new BlogPost
                {
                    Title = draft.Title!,
                    Slug = draft.Slug!,
                    Content = draft.Content!,
                    Author = draft.Author ?? "Admin",
                    PublishedAt = DateTime.UtcNow
                };

                _context.BlogPosts.Add(post);

                draft.Status = "published";
                draft.PublishedAt = post.PublishedAt;

                await _context.SaveChangesAsync();

                // OPTIONAL: trigger Netlify rebuild
                var hook = _config["Netlify:BuildHook"];
                if (!string.IsNullOrWhiteSpace(hook))
                {
                    var client = _httpClientFactory.CreateClient();
                    await client.PostAsync(hook, null);
                }

                return new PublishResult
                {
                    Success = true,
                    Message = "Published successfully"
                };
            }
        }
}