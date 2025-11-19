import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import your dashboard component
import { DashboardComponent } from '../../components/dashboard/dashboard';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [CommonModule, DashboardComponent]
})
export class Home {}
