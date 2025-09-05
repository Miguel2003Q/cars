import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  isEditing = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  // Formulario de edición
  editForm = {
    username: '',
    email: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.isLoading = true;
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.editForm = {
          username: user.username,
          email: user.email
        };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar perfil:', error);
        this.errorMessage = 'Error al cargar la información del perfil';
        this.isLoading = false;
      }
    });
  }

  startEditing() {
    this.isEditing = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelEditing() {
    this.isEditing = false;
    if (this.currentUser) {
      this.editForm = {
        username: this.currentUser.username,
        email: this.currentUser.email
      };
    }
    this.errorMessage = '';
    this.successMessage = '';
  }

  saveProfile() {
    if (!this.currentUser) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const updatedUser = {
      ...this.currentUser,
      username: this.editForm.username,
      email: this.editForm.email
    };

    this.authService.updateUser(updatedUser).subscribe({
      next: (response) => {
        this.currentUser = response.user;
        this.isEditing = false;
        this.successMessage = 'Perfil actualizado correctamente';
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al actualizar perfil:', error);
        this.errorMessage = 'Error al actualizar el perfil';
        this.isLoading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
