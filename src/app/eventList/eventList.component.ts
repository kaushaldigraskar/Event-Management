import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import {MatCardModule} from '@angular/material/card'
import { MatButton } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EventService,Event } from '../manageEvents.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButton,
    MatPaginatorModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  template: `
  <div class="search-container">
  <mat-form-field appearance="outline">
    <mat-label>Search Events</mat-label>
    <input matInput (input)="applyFilter()" [(ngModel)]="searchValue" placeholder="Search by title or location">
  </mat-form-field>
</div>
  
  <div class="container">
  <mat-card *ngFor="let event of paginatedEvents" class="event-card">
    <mat-card-title>{{ event.title }}</mat-card-title>
    <mat-card-subtitle>{{ event.date }} | {{ event.location }}</mat-card-subtitle>
    <mat-card-content>
      <p>{{ event.description }}</p>
      <button  class="viewDetails" [routerLink]="['/events',event.id]" role="button">View Details</button>    
    </mat-card-content>
  </mat-card>
  </div>

  
  <mat-paginator [length]="datalength"
                 [pageSize]="pageSize"
                 [pageSizeOptions]="[5, 10, 20]"
                 (page)="onPageChange($event)">
  </mat-paginator>
  `,
  styleUrl: './eventList.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventListComponent { 

  events: Event[] = [];
  filteredEvents: Event[] = []; 
  pageSize = 5;
  pageIndex = 0;
  paginatedEvents: Event[] = [];
  searchValue = ""
  datalength = 1

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.filteredEvents = events.sort((a,b)=>{
        return b.id - a.id
      });
      this.paginateEvents();
    });
  }

  paginateEvents(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEvents = this.events.slice(start, end);
    this.datalength = this.events.length
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateEvents();
  }
  applyFilter(): void {
    if(this.searchValue ==""){
      this.paginateEvents()
    }
    const filterValue = this.searchValue.toLowerCase();
    this.filteredEvents = this.events.filter(e => 
      e.title.toLowerCase().includes(filterValue) || 
      e.location.toLowerCase().includes(filterValue)
    );
    this.paginatedEvents = this.filteredEvents
    this.datalength = this.paginatedEvents.length
  }
}
