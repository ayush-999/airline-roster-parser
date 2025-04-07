// src/types.ts
export interface Event {
    id: number;
    type: 'DO' | 'SBY' | 'FLT' | 'CI' | 'CO' | 'UNK';
    start_time: string;
    end_time: string;
    location: string;
    metadata?: string;
  }
  
  export interface Flight {
    id: number;
    event_id: number;
    flight_number: string;
    departure_airport: string;
    arrival_airport: string;
    event: Event;
  }
  
  export interface Standby {
    id: number;
    event_id: number;
    duration: string;
    event: Event;
  }