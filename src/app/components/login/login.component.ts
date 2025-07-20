// src/app/login/login.component.ts
declare const google: any; // Ajoutez cette ligne en haut du fichier

import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, MatCardModule],
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleButton') googleButton!: ElementRef;

  constructor(private authService: AuthService) {}

  ngAfterViewInit(): void {
    this.initGoogleButton();
  }

  private initGoogleButton(attempts: number = 0): void {
    if (typeof google !== 'undefined') {
      this.authService.initializeGoogle();
      if (this.googleButton) {
        this.authService.renderGoogleButton(this.googleButton.nativeElement);
      } else {
        console.warn('Élément Google Button non trouvé');
      }
    } else if (attempts < 5) {
      setTimeout(() => this.initGoogleButton(attempts + 1), 500);
    } else {
      console.error('Google script non chargé après plusieurs tentatives');
    }
  }
}