// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list'; // Pour mat-nav-list
import { MatListModule } from '@angular/material/list';
import { AuthService } from './services/auth.service'; // Importez si besoin pour isLoggedIn() et user
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatNavList,MatListModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  isSidenavOpen: boolean = false;
  user: any = null; // Typé selon UserDetails de auth.service.ts

  constructor(private authService: AuthService, private router: Router) {
    // Chargez l'utilisateur depuis localStorage ou service si besoin
    this.user = this.authService.getUser();
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  closeSidenav() {
    this.isSidenavOpen = false; // Nouvelle méthode pour fermer après clic sur lien
  }  

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.user = null;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}