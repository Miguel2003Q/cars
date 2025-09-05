import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isLoading = false;
    });

    // Si no está autenticado, redirigir al login
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      // Intentar obtener información del usuario actual
      this.authService.getCurrentUser().subscribe({
        next: (user) => {
          this.currentUser = user;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al obtener usuario:', error);
          this.errorMessage = 'Error al cargar información del usuario';
          this.isLoading = false;
        }
      });
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
