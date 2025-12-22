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
        Task<List<BlogPost>> GetPublishedPostsAsync();
        Task<BlogPost?> GetPostBySlugAsync(string slug);
        Task<bool> DeleteDraftAsync(int id);
    }
    public class BlogService : IBlogService
    {
        private readonly SaintsDbContext _context;
        private readonly IWebHostEnvironment _env;

        public BlogService(SaintsDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
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

        public async Task<List<BlogPost>> GetPublishedPostsAsync()
        {
            return await _context.BlogPosts
                .OrderByDescending(p => p.PublishedAt)
                .ToListAsync();
        }

        public async Task<BlogPost?> GetPostBySlugAsync(string slug)
        {
            return await _context.BlogPosts
                .FirstOrDefaultAsync(p => p.Slug == slug);
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
                _env.WebRootPath,
                "blog",
                "blog-index.json"
            );

            Directory.CreateDirectory(Path.GetDirectoryName(path)!);
            await File.WriteAllTextAsync(path, json);
        }

        private void CommitAndPush()
        {
            RunGit("add src/assets/blog/blog-index.json");

            RunGit("commit -m \"Publish blog post\"");

            var gitUser = Environment.GetEnvironmentVariable("Git__Username");
            var gitToken = Environment.GetEnvironmentVariable("Git__Token");
            var gitRepo = Environment.GetEnvironmentVariable("Git__RepoUrl");

            if (string.IsNullOrWhiteSpace(gitUser) || string.IsNullOrWhiteSpace(gitToken) || string.IsNullOrWhiteSpace(gitRepo))
            {
                Console.WriteLine("Git environment variables are missing.");
                return;
            }

            var authUrl = gitRepo.Replace("https://", $"https://{gitUser}:{gitToken}@");

            RunGit($"push {authUrl} main");
        }


        private void RunGit(string args)
        {
            // Use current directory as the repo root
            var repoPath = Path.Combine(Directory.GetCurrentDirectory(), "ui", "saints-ui");

            var psi = new ProcessStartInfo
            {
                FileName = "git",
                Arguments = args,
                WorkingDirectory = repoPath,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,   // required for redirection
                Environment =
                {
                    ["GIT_ASKPASS"] = "echo",                     // disables interactive prompts
                    ["GIT_USER"] = Environment.GetEnvironmentVariable("Git__Username"),
                    ["GIT_TOKEN"] = Environment.GetEnvironmentVariable("Git__Token")
                }
            };

            using var process = Process.Start(psi)!;

            // Read output for logging
            string output = process.StandardOutput.ReadToEnd();
            string error = process.StandardError.ReadToEnd();

            process.WaitForExit();

            if (process.ExitCode != 0)
            {
                Console.WriteLine($"Git command failed: {args}");
                Console.WriteLine($"Output: {output}");
                Console.WriteLine($"Error: {error}");
                throw new Exception("Git command failed, see logs above.");
            }
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