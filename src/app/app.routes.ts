import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventDetailComponent } from './eventdetail/eventdetail.component';
import { EventFormComponent } from './EventForm/EventForm.component';

export const routes: Routes = [
    { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: HomeComponent },
  { path: 'events/:id', component: EventDetailComponent },
  { path: 'create', component: EventFormComponent },
  { path: 'edit/:id', component: EventFormComponent },
];
