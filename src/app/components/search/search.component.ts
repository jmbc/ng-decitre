import { Component } from '@angular/core';
import { ApiService } from '../../services/api';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.interface';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatListModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './search.html',
  styleUrls: ['./search.scss']
})
export class SearchComponent {
  query: string = '';
  books: Book[] = [];
  isLoading: boolean = false;
  hasSearched: boolean = false;

  constructor(private api: ApiService) { }

  searchBooks() {
    if (!this.query) {
      this.books = [];
      this.hasSearched = false;
      return;
    }

    this.isLoading = true;
    this.books = [];
    this.hasSearched = true;

    this.api.searchBooks(this.query).subscribe({
      next: (data: Book[]) => {
        this.books = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur API :', err);
        this.isLoading = false;
      }
    });
  }

  addToCollection(book: Book) {
    this.api.addToCollection(book.ean).subscribe({
      next: () => console.log('Livre ajouté à la collection'),
      error: (err) => console.error('Erreur ajout :', err)
    });
  }

  clearSearch() {
    this.query = '';
    this.books = [];
    this.hasSearched = false;
  }

  getBookPathFromLink(link: string): string {
    // Extrait la partie après "/livres/" du link (e.g., "daredevil-tome-1-face-au-diable-9791039132923.html")
    const parts = link.split('/livres/');
    return parts.length > 1 ? parts[1] : '';
  }
}