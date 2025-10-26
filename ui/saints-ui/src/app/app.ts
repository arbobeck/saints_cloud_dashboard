import { Component } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent, CommonModule],
  template: `<app-dashboard></app-dashboard>`,
})
export class App {}