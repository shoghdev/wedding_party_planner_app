export interface BookingRequest {
    fullName: string;
    email: string;
    eventDate: string; 
    eventType: 'wedding' | 'corporate' | 'birthday' | 'anniversary';
    guestCount: number;
    notes?: string;
  }
  
  export interface BookingResponse {
    id: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string;
  }
