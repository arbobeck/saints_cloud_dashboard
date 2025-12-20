import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BlogService, BlogDraft } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {
  drafts: BlogDraft[] = [];
  isLoading = true;
  error = '';

  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDrafts();
  }

  loadDrafts(): void {
    this.isLoading = true;
    this.blogService.getAllDrafts().subscribe({
      next: (drafts) => {
        this.drafts = drafts;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load drafts';
        this.isLoading = false;
        console.error('Error loading drafts:', err);
      }
    });
  }

  createNew(): void {
    this.router.navigate(['/admin/editor']);
  }

  editDraft(id: number): void {
    this.router.navigate(['/admin/editor', id]);
  }

  deleteDraft(id: number, title: string): void {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    this.blogService.deleteDraft(id).subscribe({
      next: () => {
        this.loadDrafts();
      },
      error: (err) => {
        alert('Failed to delete draft');
        console.error('Error deleting draft:', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}