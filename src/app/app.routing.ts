import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, SearchComponent, SchoolComponent } from 'app/pages';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'busca', component: SearchComponent },
    { path: 'busca/:search_input', component: SearchComponent },
    { path: 'escola/:id', component: SchoolComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
