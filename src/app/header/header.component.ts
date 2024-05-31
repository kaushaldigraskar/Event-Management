import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { EventService } from '../manageEvents.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
  ],
  template: `<!-- src/app/app.component.html -->
  <mat-toolbar color="primary" fxShow="true" fxHide.gt-sm="true">
    <span class="toolbar-title">Event Management Console</span>
    <span class="spacer"></span>
    <button class="events"  routerLink="/events">Events</button>
    <button class="create-events" routerLink="/create">Create Event</button>
    <button class="download-events" (click)="downloadExcel()">Download events</button>
  </mat-toolbar>

  `,
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { 
constructor(private manageEvents:EventService){

}
downloadExcel(){
  this.manageEvents.converDatatoExcel();
}

}
