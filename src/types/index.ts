export interface Location {
  lat: number;
  lng: number;
}

export interface Car {
  id: string;
  model: string;
  vendor: string;
  available: boolean;
  bookedAt?: Date;
  bookedBy?: string;
  location: Location;
}
