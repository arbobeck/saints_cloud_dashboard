import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Saint } from '../models/saint.model';
import { History } from '../models/history.model';

@Injectable({
  providedIn: 'root'
})
export class SaintsService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getSaints(): Observable<Saint[]> {
    return this.http.get<Saint[]>(`${this.apiUrl}/saints`);  // Fixed: () not ``
  }

  getSaint(id: number): Observable<Saint> {
    return this.http.get<Saint>(`${this.apiUrl}/saints/${id}`);  // Fixed: () not ``
  }

  getHistory(): Observable<History[]> {  // Added missing method
    return this.http.get<History[]>(`${this.apiUrl}/history`);
  }
}