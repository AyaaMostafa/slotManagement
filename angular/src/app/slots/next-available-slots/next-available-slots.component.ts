import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SlotService } from '../services/slot.service';
import { SlotDto } from '../models/slot.models';
import { TIME_ZONES } from '../slot-configuration/slot-configuration.component';

@Component({
  selector: 'app-next-available-slots',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './next-available-slots.component.html',
  styleUrls: ['./next-available-slots.component.scss'],
})
export class NextAvailableSlotsComponent {
  private slotService = inject(SlotService);

  readonly timeZones = TIME_ZONES;

  selectedTimeZone = 'Europe/London';
  count = 20;

  slots: SlotDto[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  // Track booking state per slot
  bookingInProgress = new Set<string>();
  bookedSlots = new Set<string>();
  bookingErrors: Record<string, string> = {};

  loadSlots(): void {
    if (!this.selectedTimeZone) return;

    this.isLoading = true;
    this.errorMessage = null;
    this.slots = [];

    this.slotService.getNextAvailableSlots(this.selectedTimeZone, this.count).subscribe({
      next: (slots) => {
        this.slots = slots;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.error?.message || err?.message || 'Failed to load slots.';
        this.isLoading = false;
      },
    });
  }

  onTimeZoneChange(): void {
    this.loadSlots();
  }

  bookSlot(slot: SlotDto): void {
    if (!slot.id || !slot.isBookable) return;

    this.bookingInProgress.add(slot.id);
    delete this.bookingErrors[slot.id];

    this.slotService.bookSlot(slot.id).subscribe({
      next: () => {
        this.bookingInProgress.delete(slot.id!);
        this.bookedSlots.add(slot.id!);
        slot.isBookable = false;
      },
      error: (err) => {
        this.bookingInProgress.delete(slot.id!);
        this.bookingErrors[slot.id!] =
          err?.error?.error?.message || 'Booking failed.';
      },
    });
  }

  isBookingInProgress(slot: SlotDto): boolean {
    return !!slot.id && this.bookingInProgress.has(slot.id);
  }

  isBooked(slot: SlotDto): boolean {
    return !!slot.id && this.bookedSlots.has(slot.id);
  }
}
