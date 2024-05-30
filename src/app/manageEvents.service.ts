// src/app/event.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MockData } from './mockData';
import * as XLSX from 'xlsx';

export interface Event {
  id: number;
  title: string;
  date: string | Date;
  location: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private events: Event[] = [
   ...MockData
    // more events...
  ];

  getEvents(): Observable<Event[]> {
    return of(this.events);
  }

  getEvent(id: number): Observable<Event | undefined> {
    return of(this.events.find(event => event.id === id));
  }

  addEvent(event: Event): void {
    this.events.push(event);
  }

  updateEvent(event: Event): void {
    const index = this.events.findIndex(e => e.id === event.id);
    if (index !== -1) {
      this.events[index] = event;
    }
  }

  deleteEvent(id: number): void {
    this.events = this.events.filter(event => event.id !== id);
  }
  converDatatoExcel(){
    
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(this.events);

    XLSX.utils.book_append_sheet(workBook, workSheet, 'data'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'EventManagement.xlsx')
  }
  
  getNextId(): number {
    return this.events.length > 0 ? Math.max(...this.events.map(event => event.id)) + 1 : 1;
  }
}
