import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService, AuthorDetails } from '../../services/api'; // Import AuthorDetails
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav'; // Pour le slider
import {Book} from '../../models/book.interface'

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatSidenavModule],
  templateUrl: './details.html',
  styleUrls: ['./details.scss']
})
export class DetailsComponent implements OnInit {
  book: Book | null = null;
  isLoading: boolean = true;
  path: string = '';
  selectedAuthor: string = '';
  authorDetails: AuthorDetails | null = null;
  authorLoading: boolean = false;
  sidenavOpened: boolean = false;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.path = this.route.snapshot.queryParamMap.get('path') || '';
    this.loadBookDetails();
  }

  loadBookDetails() {
    if (this.path) {
      this.api.getBookDetails(this.path).subscribe({
        next: (data: Book) => {
          this.book = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erreur chargement détails :', err);
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
  }

  openAuthorDetails(author: string) {
    this.selectedAuthor = author;
    this.authorDetails = null;
    this.authorLoading = true;
    this.sidenavOpened = true;

    this.api.getAuthorDetails(author).subscribe({
      next: (data: AuthorDetails) => {
        this.authorDetails = data;
        this.authorLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement détails auteur :', err);
        this.authorLoading = false;
      }
    });
  }

  addToCollection() {
    if (this.book) {
      this.api.addToCollection(this.book.ean).subscribe({
        next: () => alert('Livre ajouté à la collection !'),
        error: (err) => console.error('Erreur ajout :', err)
      });
    }
  }
}