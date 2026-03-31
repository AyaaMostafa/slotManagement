import { Component } from '@angular/core';
import { SlotConfigurationComponent } from '../slot-configuration/slot-configuration.component';
import { NextAvailableSlotsComponent } from '../next-available-slots/next-available-slots.component';

@Component({
  selector: 'app-slots-page',
  standalone: true,
  imports: [SlotConfigurationComponent, NextAvailableSlotsComponent],
  template: `
    <div class="container-fluid py-4">
      <div class="mb-4">
        <h3 class="fw-bold mb-1">
          <i class="bi bi-calendar3 me-2 text-primary"></i>Slot Management
        </h3>
        <p class="text-muted mb-0">Configure and manage booking time slots.</p>
      </div>

      <div class="row g-4">
        <div class="col-12 col-xl-5">
          <app-slot-configuration />
        </div>
        <div class="col-12 col-xl-7">
          <app-next-available-slots />
        </div>
      </div>
    </div>
  `,
})
export class SlotsPageComponent {}
