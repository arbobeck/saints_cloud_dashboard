import { Component, OnInit } from '@angular/core';
import { SaintsService, Saint, History } from '../../services/saints.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  saints: Saint[] = [];
  history: History[] = [];

  constructor(private saintsService: SaintsService) {}

  ngOnInit() {
    this.saintsService.getSaints().subscribe({
      next: (data) => this.saints = data,
      error: (err) => console.error('Failed to load saints', err)
    });

    this.saintsService.getHistory().subscribe({
      next: (data) => this.history = data,
      error: (err) => console.error('Failed to load history', err)
    });
  }
}

/*
interface Saint {
  id: number;
  name: string;
  feastDay: string;
  patronage: string;
}

interface History {
  id: number;
  name: string;
  year: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  saints: Saint[] = [];   // initialize as empty array
  history: History[] = []; // initialize as empty array

  constructor(private saintsService: SaintsService) { }

  ngOnInit(): void {
    // For now, mock data
    this.saints = [
      { id: 1, name: 'St. Francis of Assisi', feastDay: 'October 4', patronage: 'Animals' },
      { id: 2, name: 'St. Augustine', feastDay: 'August 28', patronage: 'Theologians' },
      { id: 3, name: 'St. Teresa of Avila', feastDay: 'October 15', patronage: 'Writers' }
    ];

    this.history = [
      { id: 1, name: 'First Vatican Council', year: 1869 },
      { id: 2, name: 'Council of Trent', year: 1545 },
      { id: 3, name: 'Edict of Milan', year: 313 }
    ];

    // Later: replace with service call
    // this.saintsService.getSaints().subscribe(data => this.saints = data);
    // this.saintsService.getHistory().subscribe(data => this.history = data);
  }
}
*/