// src/app/login/login.component.ts
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';



@Component({
  imports: [CommonModule, MatCardModule],
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('googleButton') googleButton!: ElementRef;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.initializeGoogle();
    this.authService.renderGoogleButton(this.googleButton.nativeElement);
  }
}