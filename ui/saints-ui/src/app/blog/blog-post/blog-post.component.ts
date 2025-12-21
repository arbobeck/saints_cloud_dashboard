import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  title = '';
  date = '';
  author = '';
  content: SafeHtml = '';
  isLoading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadPost(slug);
    }
  }

  async loadPost(slug: string): Promise<void> {
    try {
      interface PostIndex {
        title: string;
        slug: string;
        date: string;
        author: string;
        filename: string;
      }

      // First, get the index to find the filename
      const posts = await this.http.get<PostIndex[]>('/assets/blog/blog-index.json').toPromise();
      const post = posts?.find((p: PostIndex) => p.slug === slug);
      if (!post) {
        this.error = 'Post not found';
        this.isLoading = false;
        return;
      }

      // Load the markdown file
      const markdown = await this.http.get(`/assets/blog/${post.filename}`, { responseType: 'text' }).toPromise();
      
      if (markdown) {
        this.parseMarkdown(markdown);
      }

      this.isLoading = false;
    } catch (err) {
      this.error = 'Failed to load blog post';
      this.isLoading = false;
      console.error('Error loading post:', err);
    }
  }

  parseMarkdown(markdown: string): void {
    // Parse frontmatter
    const lines = markdown.split('\n');
    let contentStart = 0;

    if (lines[0].trim() === '---') {
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '---') {
          contentStart = i + 1;
          break;
        }

        const [key, ...valueParts] = lines[i].split(':');
        const value = valueParts.join(':').trim().replace(/^"|"$/g, '');

        if (key.trim() === 'title') this.title = value;
        if (key.trim() === 'date') this.date = value;
        if (key.trim() === 'author') this.author = value;
      }
    }

    // Convert markdown to HTML (basic implementation)
    const content = lines.slice(contentStart).join('\n');
    const html = this.simpleMarkdownToHtml(content);
    this.content = this.sanitizer.bypassSecurityTrustHtml(html);
  }

  simpleMarkdownToHtml(markdown: string): string {
    let html = markdown;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    
    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    
    return html;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}