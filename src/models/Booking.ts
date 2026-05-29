import type { Passenger } from "./Passenger";

export type Booking = {
  bookingId: string;

  passenger: Passenger;

  flightNumber: string;

  seatNumber: string;

  bookingDate: string;

  totalPrice: number;

  status: string;
};