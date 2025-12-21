import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.error = 'Please enter username and password';
      return;
    }

    this.isLoading = true;
    this.error = '';

    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          this.error = 'Invalid username or password';
          this.isLoading = false;
          console.error('Login error:', err);
        }
      });
  }
}