import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService,Event } from '../manageEvents.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-eventdetail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
  ],
  template: `<!-- src/app/event-detail/event-detail.component.html -->
<!-- src/app/event-detail/event-detail.component.html -->
<div class="event-detail-container" *ngIf="event">
  <h1>{{ event.title }}</h1>
  <div class="event-detail-info">
    <p><strong>Date:</strong> {{ event.date }}</p>
    <p><strong>Location:</strong> {{ event.location }}</p>
    <p><strong>Description:</strong> {{ event.description }}</p>
  </div>
  <div class="event-detail-actions">
  <button class="button button-back" (click)="goBack()">Back</button>
    <button class="button button-edit" (click)="editEvent()">Edit</button>
    <button class="button button-delete" (click)="deleteEvent()">Delete</button>
  </div>
</div>

  `,
  styleUrl: './eventdetail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailComponent implements OnInit {
  event: Event | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEvent(id).subscribe(event => this.event = event);
  }

  goBack(): void {
    this.router.navigate(['/events']);
  }

  editEvent(): void {
    this.router.navigate(['/edit', this.event?.id]);
  }

  deleteEvent(): void {
    if (this.event) {
      this.eventService.deleteEvent(this.event.id);
      this.router.navigate(['/events']);
    }
  }
}
