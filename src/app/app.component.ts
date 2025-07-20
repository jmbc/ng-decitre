// src/app/app.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; 
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav'; // Ajoutez cet import pour mat-sidenav-container et mat-sidenav
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterModule,MatToolbarModule,MatIconModule,MatCardModule,MatSidenavModule,MatListModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  user: any;

  isSidenavOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen; // Bascule l'état du sidenav
  }  

  logout() {
    this.authService.logout();
    this.user = null;
    this.sidenav.close();
    this.router.navigate(['/login']);
  }

  navigateToLogin() {
    this.sidenav.close();
    this.router.navigate(['/login']);
  }
}