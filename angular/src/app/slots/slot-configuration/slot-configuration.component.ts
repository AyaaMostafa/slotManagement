import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SlotService } from '../services/slot.service';
import { GenerateSlotsResponse } from '../models/slot.models';

export const TIME_ZONES = [
  'Africa/Cairo',
  'America/New_York',
  'America/Los_Angeles',
  'America/Chicago',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Dubai',
  'Asia/Tokyo',
  'Asia/Singapore',
  'Australia/Sydney',
];

function dateRangeValidator(group: AbstractControl): ValidationErrors | null {
  const start = group.get('startDate')?.value;
  const end = group.get('endDate')?.value;
  if (start && end && start > end) {
    return { dateRange: true };
  }
  return null;
}

@Component({
  selector: 'app-slot-configuration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './slot-configuration.component.html',
  styleUrls: ['./slot-configuration.component.scss'],
})
export class SlotConfigurationComponent {
  private fb = inject(FormBuilder);
  private slotService = inject(SlotService);

  readonly timeZones = TIME_ZONES;

  form: FormGroup = this.fb.group(
    {
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      timeZone: ['Europe/London', Validators.required],
      slotDuration: [30, [Validators.required, Validators.min(1)]],
    },
    { validators: dateRangeValidator }
  );

  isLoading = false;
  result: GenerateSlotsResponse | null = null;
  errorMessage: string | null = null;

  get startDate() { return this.form.get('startDate')!; }
  get endDate() { return this.form.get('endDate')!; }
  get timeZone() { return this.form.get('timeZone')!; }
  get slotDuration() { return this.form.get('slotDuration')!; }
  get hasDateRangeError() { return this.form.errors?.['dateRange'] && this.endDate.touched; }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.result = null;
    this.errorMessage = null;

    const { startDate, endDate, timeZone, slotDuration } = this.form.value;

    this.slotService.generateSlots({ startDate, endDate, timeZone, slotDuration }).subscribe({
      next: (res) => {
        this.result = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.error?.message || err?.message || 'An unexpected error occurred.';
        this.isLoading = false;
      },
    });
  }
}
