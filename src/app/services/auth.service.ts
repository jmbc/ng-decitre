// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

declare const google: any;

interface UserDetails {
  id: number;
  email: string;
  name: string;
  activated: boolean; // L'API retourne cela ; false par défaut
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  initializeGoogle() {
    console.log( environment.googleClientId);
    google.accounts.id.initialize({
      
      client_id: environment.googleClientId,
      callback: (response: any) => this.handleGoogleResponse(response)
    });
  }

  renderGoogleButton(parentElement: HTMLElement, options: any = {}) {
    google.accounts.id.renderButton(
      parentElement,
      { theme: 'outline', size: 'large', text: 'continue_with', ...options }
    );
  }

  private handleGoogleResponse(response: any) {
    const idToken = response.credential;
    this.registerWithGoogle(idToken).subscribe({
      next: (user: UserDetails) => {
        localStorage.setItem('user', JSON.stringify(user));
        if (!user.activated) {
          // Optionnel : Affichez un message avec MatSnackBar pour activation requise
          console.warn('Utilisateur enregistré mais non activé.');
        }
        this.router.navigate(['/recherche']);
      },
      error: (err) => {
        console.error('Erreur lors de l\'enregistrement :', err);
        // Si erreur (ex. : utilisateur existant), ajoutez une logique de login si route disponible
      }
    });
  }

  registerWithGoogle(token: string): Observable<UserDetails> {
    return this.http.post<UserDetails>(`${environment.apiUrl}/register/google`, { token });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getUser(): UserDetails | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}