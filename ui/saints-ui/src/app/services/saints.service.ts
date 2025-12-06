import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Saint } from '../models/saint.model';
import { History } from '../models/history.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaintsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { 
    console.log('API URL:', this.apiUrl);
  }

  getSaints(): Observable<Saint[]> {
    return this.http.get<Saint[]>(`${this.apiUrl}/saints`);
  }

  getSaint(id: number): Observable<Saint> {
    return this.http.get<Saint>(`${this.apiUrl}/saints/${id}`);
  }

  getHistory(): Observable<History[]> {
    return this.http.get<History[]>(`${this.apiUrl}/history`);
  }
}