export interface GenerateSlotsRequest {
  startDate: string;      // ISO date string "YYYY-MM-DD"
  endDate: string;
  timeZone: string;
  slotDuration: number;   // minutes
}

export interface GenerateSlotsResponse {
  totalSlotsCreated: number;
}

export interface SlotDto {
  id?: string;
  localStartTime: string;
  localEndTime: string;
  durationMinutes: number;
  timeZone: string;
  isBookable: boolean;
}
