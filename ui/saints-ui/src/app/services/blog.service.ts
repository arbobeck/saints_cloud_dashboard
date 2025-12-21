// services/blog.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface BlogDraft {
  id: number;
  title: string;
  slug: string;
  content: string;
  author: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface CreateDraftRequest {
  title: string;
  content: string;
}

export interface UpdateDraftRequest {
  title: string;
  content: string;
}

export interface PublishResponse {
  message: string;
  commitHash?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'https://saints-api-dzwz.onrender.com';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllDrafts(): Observable<BlogDraft[]> {
    return this.http.get<BlogDraft[]>(`${this.apiUrl}/drafts`, {
      headers: this.getHeaders()
    });
  }

  getDraft(id: number): Observable<BlogDraft> {
    return this.http.get<BlogDraft>(`${this.apiUrl}/drafts/${id}`, {
      headers: this.getHeaders()
    });
  }

  createDraft(request: CreateDraftRequest): Observable<BlogDraft> {
    return this.http.post<BlogDraft>(`${this.apiUrl}/drafts`, request, {
      headers: this.getHeaders()
    });
  }

  updateDraft(id: number, request: UpdateDraftRequest): Observable<BlogDraft> {
    return this.http.put<BlogDraft>(`${this.apiUrl}/drafts/${id}`, request, {
      headers: this.getHeaders()
    });
  }

  deleteDraft(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/drafts/${id}`, {
      headers: this.getHeaders()
    });
  }

  publishDraft(id: number): Observable<PublishResponse> {
    return this.http.post<PublishResponse>(`${this.apiUrl}/publish/${id}`, {}, {
      headers: this.getHeaders()
    });
  }
}