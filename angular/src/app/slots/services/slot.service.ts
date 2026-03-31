import { Injectable } from '@angular/core';
import { RestService } from '@abp/ng.core';
import { Observable } from 'rxjs';
import { GenerateSlotsRequest, GenerateSlotsResponse, SlotDto } from '../models/slot.models';

@Injectable({ providedIn: 'root' })
export class SlotService {
  private readonly apiName = 'Default';

  constructor(private rest: RestService) {}

  generateSlots(request: GenerateSlotsRequest): Observable<GenerateSlotsResponse> {
    return this.rest.request<GenerateSlotsRequest, GenerateSlotsResponse>(
      {
        method: 'POST',
        url: '/api/app/slot/generate',
        body: request,
      },
      { apiName: this.apiName }
    );
  }

  getNextAvailableSlots(timeZone: string, count: number = 20): Observable<SlotDto[]> {
    return this.rest.request<void, SlotDto[]>(
      {
        method: 'GET',
        url: '/api/app/slot/next-available',
        params: { timeZone, count },
      },
      { apiName: this.apiName }
    );
  }

  bookSlot(slotId: string): Observable<void> {
    return this.rest.request<void, void>(
      {
        method: 'POST',
        url: `/api/app/slot/book/${slotId}`,
      },
      { apiName: this.apiName }
    );
  }
}
