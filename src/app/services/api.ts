import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Ajoutez HttpParams ici
import { Observable } from 'rxjs';
import { Book } from '../models/book.interface';

export interface AuthorDetails {
  name: string;
  biography: string;
  source: string;
  photo: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8090'; // Ajustez selon votre API

  constructor(private http: HttpClient) {}

  searchBooks(query: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/search?q=${query}`);
  }

  getBookDetails(path: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/book?path=livres/${path}`);
  }

  getAuthorDetails(name: string): Observable<AuthorDetails> {
    const params = new HttpParams().set('name', name.trim()); // Utilisez HttpParams pour un encodage correct
    return this.http.get<AuthorDetails>(`${this.apiUrl}/author`, { params });
  }

  addToCollection(ean: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/collection`, { ean });
  }

  getCollection(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/collection`);
  }

  removeFromCollection(ean: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/collection/${ean}`);
  }
}