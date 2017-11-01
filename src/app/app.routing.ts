import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { SchoolComponent } from './school/school.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'busca', component: SearchComponent },
    { path: 'busca/:search_input', component: SearchComponent },
    { path: 'escola/:id', component: SchoolComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
