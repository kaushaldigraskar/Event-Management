import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../manageEvents.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import moment from 'moment';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  template: `
<div class="event-form-container">
  <form [formGroup]="eventForm" class="event-form" (ngSubmit)="saveEvent()">
    <mat-form-field appearance="fill">
      <mat-label>Title</mat-label>
      <input matInput formControlName="title" required>
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>Date</mat-label>
      <input matInput [matDatepicker]="picker"  formControlName="date" required>
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>Location</mat-label>
      <input matInput formControlName="location" required>
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>Description</mat-label>
      <textarea matInput formControlName="description" required></textarea>
    </mat-form-field>

    <div class="button-container">
      <button class="button-save" type="submit" [disabled]="eventForm.invalid">Save</button>
    </div>
  </form>
</div>


  `,
  styleUrl: './EventForm.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.eventService.getEvent(Number(id)).subscribe(event => {
        if (event) {
          this.eventForm.patchValue({...event,
            date:new Date(event.date).toISOString()
          });
        }
      });
    }
  }

  initializeForm(): void {
    this.eventForm = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      date: [null, Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  saveEvent(): void {
    const formValue = { ...this.eventForm.value };
    formValue.date = moment(formValue.date).format('DD-MM-YYYY'); // Format date before saving
    if (this.isEditMode) {
      this.eventService.updateEvent(formValue);
    } else {
      formValue.id = this.eventService.getNextId();
      this.eventService.addEvent(formValue);
    }
    this.router.navigate(['/events']);
  }
}
