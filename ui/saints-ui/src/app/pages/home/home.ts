import { Component } from '@angular/core';


// Import your dashboard component
import { DashboardComponent } from '../../components/dashboard/dashboard';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [DashboardComponent]
})
export class Home {}
