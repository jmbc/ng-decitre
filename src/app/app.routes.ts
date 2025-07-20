import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { DetailsComponent } from './components/book-detail/details.component';
import { CollectionComponent } from './components/collection/collection.component';
import { LoginComponent } from './components/login/login.component'; 
import { AuthGuard } from './guards/auth.guards';

export const routes: Routes = [
  { path: 'recherche', component: SearchComponent },
  { path: 'book', component: DetailsComponent }, // Route pour les détails avec query params
  { path: 'collection', component: CollectionComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/recherche', pathMatch: 'full' }
];

// Configuration globale des routes avec défilement
export const routing = RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'top', // Définit le défilement vers le haut à chaque navigation
  anchorScrolling: 'enabled',      // Active le défilement vers les ancres si nécessaire
  onSameUrlNavigation: 'reload'    // Recharge la page même sur la même URL (optionnel)
});