import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface UptimeData {
  service: string;
  status: 'online' | 'offline' | 'degraded';
  uptime: number;
  lastChecked: Date;
}

@Component({
  selector: 'app-uptime',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uptime.html',
  styleUrls: ['./uptime.css']
})
export class Uptime implements OnInit {
  services: UptimeData[] = [
    {
      service: 'Web Application',
      status: 'online',
      uptime: 99.9,
      lastChecked: new Date()
    },
    {
      service: 'API Server',
      status: 'online',
      uptime: 99.8,
      lastChecked: new Date()
    },
    {
      service: 'Database',
      status: 'online',
      uptime: 99.95,
      lastChecked: new Date()
    },
    {
      service: 'CDN',
      status: 'online',
      uptime: 99.99,
      lastChecked: new Date()
    }
  ];

  overallUptime: number = 0;

  ngOnInit() {
    this.calculateOverallUptime();
    // Update last checked time every minute
    setInterval(() => {
      this.services.forEach(service => {
        service.lastChecked = new Date();
      });
    }, 60000);
  }

  calculateOverallUptime() {
    const total = this.services.reduce((sum, service) => sum + service.uptime, 0);
    this.overallUptime = total / this.services.length;
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'online': 'Operational',
      'offline': 'Down',
      'degraded': 'Degraded Performance'
    };
    return statusMap[status] || status;
  }
}