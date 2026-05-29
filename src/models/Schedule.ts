import type { Booking } from "./Booking";

export type Schedule = {
  flightNumber: string;

  origin: string;
  destination: string;

  departureDate: string;
  departureTime: string;
  departureTimezone: string;

  arrivalDate: string;
  arrivalTime: string;
  arrivalTimezone: string;

  aircraft: string;

  capacity: number;
  bookedSeats: number;
  availableSeats: number;

  price: number;

  bookings: Booking[];
};