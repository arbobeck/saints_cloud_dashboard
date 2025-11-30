import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaintsService } from '../../services/saints.service';
import { Saint } from '../../models/saint.model';
import { History } from '../../models/history.model';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { ErrorMessage } from '../error-message/error-message';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LoadingSpinner, ErrorMessage],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  saints: Saint[] = [];
  history: History[] = [];
  loadingSaints = false;
  loadingHistory = false;
  errorSaints: string | null = null;
  errorHistory: string | null = null;

  constructor(private saintsService: SaintsService) {}

  ngOnInit(): void {
    this.fetchSaints();
    this.fetchHistory();
  }

  fetchSaints(): void {
    this.loadingSaints = true;
    this.errorSaints = null;
    this.saintsService.getSaints().subscribe({
      next: (data: Saint[]) => {  // Added type
        this.saints = data;
        this.loadingSaints = false;
      },
      error: (_err: unknown) => {  // Added underscore prefix and type
        this.errorSaints = 'Failed to load saints';
        this.loadingSaints = false;
      }
    });
  }

  fetchHistory(): void {
    this.loadingHistory = true;
    this.errorHistory = null;
    this.saintsService.getHistory().subscribe({
      next: (data: History[]) => {  // Added type
        this.history = data;
        this.loadingHistory = false;
      },
      error: (_err: unknown) => {  // Added underscore prefix and type
        this.errorHistory = 'Failed to load history';
        this.loadingHistory = false;
      }
    });
  }
}