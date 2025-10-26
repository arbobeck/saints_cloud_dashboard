import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

// Frontend data types
export interface Saint {
  id: number;
  name: string;
  feastDay: string;
  patronages: string[];
}

export interface History {
  id: number;
  name: string;
  year: number;
}


@Injectable({
  providedIn: 'root'  // makes it injectable globally
})



export class SaintsService {
  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}
  
  getSaints(): Observable<Saint[]> {
    return this.http.get<Saint[]>(`${this.apiUrl}/saints`);
  }

  getHistory(): Observable<History[]> {
    return this.http.get<History[]>(`${this.apiUrl}/history`);
  }
}

/*
  getSaints(): Observable<Saint[]> {
    return of([
      { id: 1, name: 'St. Francis of Assisi', feastDay: 'October 4', patronage: 'Animals' },
      { id: 2, name: 'St. Augustine', feastDay: 'August 28', patronage: 'Theologians' },
      { id: 3, name: 'St. Teresa of Avila', feastDay: 'October 15', patronage: 'Writers' }
    ]);
  }

  getHistory(): Observable<History[]> {
    return of([
      { id: 1, name: 'First Vatican Council', year: 1869 },
      { id: 2, name: 'Council of Trent', year: 1545 },
      { id: 3, name: 'Edict of Milan', year: 313 }
    ]);
  }
}
*/