using LibGit2Sharp;
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
        private readonly IConfiguration _configuration;
        private readonly ILogger<PublishService> _logger;

        public PublishService(
            SaintsDbContext context,
            IConfiguration configuration,
            ILogger<PublishService> logger)
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<PublishResult> PublishDraftAsync(int draftId)
        {
            try
            {
                var draft = await _context.BlogDrafts.FindAsync(draftId);
                if (draft == null)
                {
                    return new PublishResult { Success = false, Message = "Draft not found" };
                }

                var repoPath = _configuration["Git:RepoPath"] ?? "/tmp/byzantica-repo";
                var repoUrl = _configuration["Git:RepoUrl"]; // Your main byzantica repo
                var gitUsername = _configuration["Git:Username"];
                var gitToken = _configuration["Git:Token"];

                if (string.IsNullOrEmpty(repoUrl) || string.IsNullOrEmpty(gitToken))
                {
                    return new PublishResult { Success = false, Message = "Git configuration missing" };
                }

                // Clone or pull main repository
                Repository repo;
                if (!Directory.Exists(Path.Combine(repoPath, ".git")))
                {
                    _logger.LogInformation("Cloning main repository...");
                    var cloneOptions = new CloneOptions();
                    cloneOptions.FetchOptions.CredentialsProvider = (url, user, cred) => 
                        new UsernamePasswordCredentials
                        {
                            Username = gitUsername,
                            Password = gitToken
                        };
                    
                    Repository.Clone(repoUrl, repoPath, cloneOptions);
                }

                repo = new Repository(repoPath);

                var pullOptions = new PullOptions
                {
                    FetchOptions = new FetchOptions
                    {
                        CredentialsProvider = (url, user, cred) =>
                            new UsernamePasswordCredentials
                            {
                                Username = gitUsername,
                                Password = gitToken
                            }
                    }
                };


                var signature = new Signature(
                    new Identity(gitUsername ?? "Byzantica Admin", "admin@byzantica.org"),
                    DateTimeOffset.Now
                );

                Commands.Pull(repo, signature, pullOptions);

                // Create blog directory in src/assets
                var blogDir = Path.Combine(repoPath, "src", "assets", "blog");
                Directory.CreateDirectory(blogDir);

                // Generate and save markdown file
                var markdown = GenerateMarkdown(draft);
                var fileName = $"{DateTime.UtcNow:yyyy-MM-dd}-{draft.Slug}.md";
                var filePath = Path.Combine(blogDir, fileName);
                await File.WriteAllTextAsync(filePath, markdown);

                // Generate blog index
                await GenerateBlogIndexAsync(blogDir);

                // Stage changes
                Commands.Stage(repo, "src/assets/blog/*");

                // Commit
                var commit = repo.Commit(
                    $"Publish blog post: {draft.Title ?? "Untitled"}",
                    signature,
                    signature
                );

                // Push to main
                var pushOptions = new PushOptions();
                pushOptions.CredentialsProvider = (url, user, cred) => 
                    new UsernamePasswordCredentials
                    {
                        Username = gitUsername,
                        Password = gitToken
                    };

                var branch = repo.Branches["main"] ?? repo.Branches["master"];
                if (branch == null)
                {
                    throw new InvalidOperationException("No 'main' or 'master' branch found in repository.");
                }

                // Update draft status
                draft.Status = "published";
                draft.PublishedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();

                _logger.LogInformation($"Published draft {draftId} - Commit: {commit.Sha}");

                return new PublishResult
                {
                    Success = true,
                    Message = "Published successfully. Netlify will auto-deploy in ~2 minutes.",
                    CommitHash = commit.Sha
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error publishing draft {draftId}");
                return new PublishResult
                {
                    Success = false,
                    Message = $"Failed to publish: {ex.Message}"
                };
            }
        }

        private string GenerateMarkdown(BlogDraft draft)
        {
            return $@"---
title: ""{draft.Title}""
slug: ""{draft.Slug}""
date: ""{DateTime.UtcNow:yyyy-MM-dd}""
author: ""{draft.Author ?? "Admin"}""
---

{draft.Content}";
        }

        private async Task GenerateBlogIndexAsync(string blogDir)
        {
            var posts = new List<BlogPostIndex>();
            var files = Directory.GetFiles(blogDir, "*.md");

            foreach (var file in files)
            {
                var content = await File.ReadAllTextAsync(file);
                var post = ParseFrontmatter(content, Path.GetFileName(file));
                if (post != null)
                {
                    posts.Add(post);
                }
            }

            posts = posts.OrderByDescending(p => p.Date).ToList();

            var indexPath = Path.Combine(blogDir, "blog-index.json");
            var json = JsonSerializer.Serialize(posts, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            });

            await File.WriteAllTextAsync(indexPath, json);
        }

        private BlogPostIndex? ParseFrontmatter(string content, string filename)
        {
            try
            {
                var lines = content.Split('\n');
                if (lines[0].Trim() != "---") return null;

                var frontmatter = new Dictionary<string, string>();
                for (int i = 1; i < lines.Length; i++)
                {
                    if (lines[i].Trim() == "---") break;

                    var parts = lines[i].Split(':', 2);
                    if (parts.Length == 2)
                    {
                        var key = parts[0].Trim();
                        var value = parts[1].Trim().Trim('"');
                        frontmatter[key] = value;
                    }
                }

                return new BlogPostIndex
                {
                    Title = frontmatter.GetValueOrDefault("title", ""),
                    Slug = frontmatter.GetValueOrDefault("slug", ""),
                    Date = frontmatter.GetValueOrDefault("date", ""),
                    Author = frontmatter.GetValueOrDefault("author", "Admin"),
                    Filename = filename
                };
            }
            catch
            {
                return null;
            }
        }
    }

    public class BlogPostIndex
    {
        public string Title { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string Filename { get; set; } = string.Empty;
    }
}