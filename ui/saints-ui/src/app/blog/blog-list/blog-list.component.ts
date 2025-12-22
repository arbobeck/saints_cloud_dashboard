import { Component, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface BlogPost {
  title: string;
  slug: string;
  publishedAt: string;
  author: string;
  filename: string;
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  posts: BlogPost[] = [];
  isLoading = true;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.http.get<BlogPost[]>('https://saints-api-dzwz.onrender.com/api/blog/blog-index.json').subscribe({
      next: (posts: BlogPost[]) => {
        this.posts = posts;
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.error = 'No blog posts available yet';
        this.isLoading = false;
        console.error('Error loading blog posts:', err);
      }
    });
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