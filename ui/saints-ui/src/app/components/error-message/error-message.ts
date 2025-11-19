// src/app/components/error-message/error-message.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message" class="error-message">
      <p>{{ message }}</p>
    </div>
  `,
  styles: [`
    .error-message {
      color: red;
      background-color: #fee2e2;
      border: 1px solid red;
      padding: 1rem;
      border-radius: 0.5rem;
      margin: 1rem 0;
    }
  `]
})
export class ErrorMessage {
  @Input() message: string | null = null;
}