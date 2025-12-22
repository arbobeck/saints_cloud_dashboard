import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface BlogPost {
  title: string;
  slug: string;
  publishedAt: string;
  author: string;
  content: string;
}
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

  loadPost(slug: string): void {
    this.http
      .get<BlogPost>(`https://saints-api-dzwz.onrender.com/api/blog/posts/${slug}`)
      .subscribe({
        next: (post) => {
          this.title = post.title;
          this.date = post.publishedAt;
          this.author = post.author;
          this.content = this.sanitizer.bypassSecurityTrustHtml(post.content);
          this.isLoading = false;
        },
        error: () => {
          this.error = 'Post not found';
          this.isLoading = false;
        }
      });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}