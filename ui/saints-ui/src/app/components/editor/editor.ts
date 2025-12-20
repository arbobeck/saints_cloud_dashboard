import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editor.html',
  styleUrls: ['./editor.css']
})
export class EditorComponent implements OnInit {
  draftId: number | null = null;
  title = '';
  content = '';
  isLoading = false;
  isSaving = false;
  error = '';
  successMessage = '';

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.draftId = parseInt(id, 10);
      this.loadDraft();
    }
  }

  loadDraft(): void {
    if (!this.draftId) return;

    this.isLoading = true;
    this.blogService.getDraft(this.draftId).subscribe({
      next: (draft) => {
        this.title = draft.title;
        this.content = draft.content;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load draft';
        this.isLoading = false;
        console.error('Error loading draft:', err);
      }
    });
  }

  saveDraft(): void {
    if (!this.title.trim() || !this.content.trim()) {
      this.error = 'Title and content are required';
      return;
    }

    this.isSaving = true;
    this.error = '';
    this.successMessage = '';

    const request = {
      title: this.title,
      content: this.content
    };

    const operation = this.draftId
      ? this.blogService.updateDraft(this.draftId, request)
      : this.blogService.createDraft(request);

    operation.subscribe({
      next: (draft) => {
        this.isSaving = false;
        this.successMessage = 'Draft saved successfully!';
        
        if (!this.draftId) {
          this.draftId = draft.id;
          this.router.navigate(['/admin/editor', draft.id], { replaceUrl: true });
        }

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => {
        this.error = 'Failed to save draft';
        this.isSaving = false;
        console.error('Error saving draft:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}