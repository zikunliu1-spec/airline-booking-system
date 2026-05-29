export type StoredBooking = {
  bookingReference: string;
  flightNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  passportNumber: string;
  status: string;
  price: number;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  aircraft: string;
};

export function getStoredBookings(): StoredBooking[] {
  if (typeof window === "undefined") {
    return [];
  }

  return JSON.parse(localStorage.getItem("bookings") || "[]");
}

export function saveStoredBookings(bookings: StoredBooking[]) {
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

export function getConfirmedBookingCount(flightNumber: string) {
  const bookings = getStoredBookings();

  return bookings.filter(
    (booking) =>
      booking.flightNumber === flightNumber &&
      booking.status === "Confirmed"
  ).length;
}