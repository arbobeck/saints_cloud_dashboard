using SaintsApi.Data;
using SaintsApi.Models;
using SaintsApi.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using System.Text.Json;
using System.Diagnostics;

namespace SaintsApi.Services
{
    public interface IBlogService
    {
        Task<List<BlogDraftResponse>> GetAllDraftsAsync();
        Task<BlogDraftResponse?> GetDraftByIdAsync(int id);
        Task<BlogDraftResponse> CreateDraftAsync(CreateDraftRequest request);
        Task<BlogDraftResponse?> UpdateDraftAsync(int id, UpdateDraftRequest request);
        Task<List<BlogDraftResponse>> GetPublishedPostsAsync();
        Task<BlogDraftResponse?> GetPostBySlugAsync(string slug);
        Task<BlogDraftResponse?> PublishDraftAsync(int id);
        Task<bool> DeleteDraftAsync(int id);
    }

    public class BlogService : IBlogService
    {
        private readonly SaintsDbContext _context;

        public BlogService(SaintsDbContext context)
        {
            _context = context;
        }

        public async Task<List<BlogDraftResponse>> GetAllDraftsAsync()
        {
            return await _context.BlogDrafts
                .OrderByDescending(d => d.UpdatedAt)
                .Select(d => MapToResponse(d))
                .ToListAsync();
        }

        public async Task<BlogDraftResponse?> GetDraftByIdAsync(int id)
        {
            var draft = await _context.BlogDrafts.FindAsync(id);
            return draft != null ? MapToResponse(draft) : null;
        }

        public async Task<BlogDraftResponse> CreateDraftAsync(CreateDraftRequest request)
        {
            var slug = GenerateSlug(request.Title);
            
            // Ensure slug is unique
            var existingSlug = await _context.BlogDrafts
                .AnyAsync(d => d.Slug == slug);
            
            if (existingSlug)
            {
                slug = $"{slug}-{DateTime.UtcNow.Ticks}";
            }

            var draft = new BlogDraft
            {
                Title = request.Title,
                Slug = slug,
                Content = request.Content,
                Status = "draft",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.BlogDrafts.Add(draft);
            await _context.SaveChangesAsync();

            return MapToResponse(draft);
        }

        public async Task<BlogDraftResponse?> UpdateDraftAsync(int id, UpdateDraftRequest request)
        {
            var draft = await _context.BlogDrafts.FindAsync(id);
            if (draft == null) return null;

            draft.Title = request.Title;
            draft.Content = request.Content;
            draft.UpdatedAt = DateTime.UtcNow;
            
            // Regenerate slug if title changed significantly
            var newSlug = GenerateSlug(request.Title);
            if (newSlug != draft.Slug)
            {
                var slugExists = await _context.BlogDrafts
                    .AnyAsync(d => d.Slug == newSlug && d.Id != id);
                
                if (!slugExists)
                {
                    draft.Slug = newSlug;
                }
            }

            await _context.SaveChangesAsync();
            return MapToResponse(draft);
        }

        public async Task<bool> DeleteDraftAsync(int id)
        {
            var draft = await _context.BlogDrafts.FindAsync(id);
            if (draft == null) return false;

            _context.BlogDrafts.Remove(draft);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<BlogDraftResponse>> GetPublishedPostsAsync()
        {
            return await _context.BlogDrafts
                .Where(d => d.Status == "published")
                .OrderByDescending(d => d.PublishedAt)
                .Select(d => MapToResponse(d))
                .ToListAsync();
        }

        public async Task<BlogDraftResponse?> GetPostBySlugAsync(string slug)
        {
            var post = await _context.BlogDrafts
                .FirstOrDefaultAsync(d => d.Slug == slug && d.Status == "published");
            return post != null ? MapToResponse(post) : null;
        }

        public async Task<BlogDraftResponse?> PublishDraftAsync(int id)
        {
            var draft = await _context.BlogDrafts.FindAsync(id);
            if (draft == null) return null;

            draft.Status = "published";
            draft.PublishedAt = DateTime.UtcNow;
            draft.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            // 1. Regenerate blog index JSON
            await GenerateBlogIndexJsonAsync();

            // 2. Commit + push
            CommitAndPush();

            return MapToResponse(draft);
        }

        private async Task GenerateBlogIndexJsonAsync()
        {
            var publishedPosts = await _context.BlogDrafts
                .Where(d => d.Status == "published")
                .OrderByDescending(d => d.PublishedAt)
                .Select(d => new
                {
                    id = d.Id,
                    title = d.Title,
                    slug = d.Slug,
                    author = d.Author,
                    publishedAt = d.PublishedAt
                })
                .ToListAsync();

            var json = System.Text.Json.JsonSerializer.Serialize(
                publishedPosts,
                new JsonSerializerOptions { WriteIndented = true }
            );

            var path = Path.Combine(
                "/repo/byzantica-frontend/src/app/assets/blog",
                "blog-index.json"
            );

            Directory.CreateDirectory(Path.GetDirectoryName(path)!);
            await File.WriteAllTextAsync(path, json);
        }

        private void CommitAndPush()
        {
            RunGit("add src/app/assets/blog/blog-index.json");
            RunGit("commit -m \"Publish blog post\"");
            RunGit("push origin main");
        }

        private void RunGit(string args)
        {
            var psi = new ProcessStartInfo
            {
                FileName = "git",
                Arguments = args,
                WorkingDirectory = "/repo/byzantica-frontend",
                RedirectStandardOutput = true,
                RedirectStandardError = true
            };

            using var process = Process.Start(psi);
            process!.WaitForExit();
        }

        private static string GenerateSlug(string title)
        {
            // Convert to lowercase
            var slug = title.ToLowerInvariant();
            
            // Remove special characters
            slug = Regex.Replace(slug, @"[^a-z0-9\s-]", "");
            
            // Replace spaces with hyphens
            slug = Regex.Replace(slug, @"\s+", "-");
            
            // Remove multiple consecutive hyphens
            slug = Regex.Replace(slug, @"-+", "-");
            
            // Trim hyphens from start and end
            slug = slug.Trim('-');
            
            // Limit length
            if (slug.Length > 100)
            {
                slug = slug.Substring(0, 100).TrimEnd('-');
            }

            return slug;
        }

        private static BlogDraftResponse MapToResponse(BlogDraft draft)
        {
            return new BlogDraftResponse
            {
                Id = draft.Id,
                Title = draft.Title,
                Slug = draft.Slug,
                Content = draft.Content,
                Author = draft.Author,
                Status = draft.Status,
                CreatedAt = draft.CreatedAt,
                UpdatedAt = draft.UpdatedAt,
                PublishedAt = draft.PublishedAt
            };
        }
    }
}