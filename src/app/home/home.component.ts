import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EventListComponent } from '../eventList/eventList.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    EventListComponent
  ],
  template: `<div>

  <app-event-list></app-event-list>
  </div>`,
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }
