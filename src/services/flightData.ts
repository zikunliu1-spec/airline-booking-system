type FlightSchedule = {
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
  availableSeats: number;
  price: number;
};

export const flightSchedules: FlightSchedule[] = [];

function addFlight(
  flightNumber: string,
  origin: string,
  destination: string,
  departureDate: string,
  departureTime: string,
  departureTimezone: string,
  arrivalDate: string,
  arrivalTime: string,
  arrivalTimezone: string,
  aircraft: string,
  capacity: number,
  price: number
) {
  flightSchedules.push({
    flightNumber,
    origin,
    destination,
    departureDate,
    departureTime,
    departureTimezone,
    arrivalDate,
    arrivalTime,
    arrivalTimezone,
    aircraft,
    capacity,
    availableSeats: capacity,
    price,
  });
}

const weekdays = [
  "2026-05-25",
  "2026-05-26",
  "2026-05-27",
  "2026-05-28",
  "2026-05-29",
  "2026-06-01",
  "2026-06-02",
  "2026-06-03",
  "2026-06-04",
  "2026-06-05",
];

weekdays.forEach((date, index) => {
  const base = 200 + index * 4;

  addFlight(`DF${base}`, "NZNE", "NZRO", date, "07:00", "GMT+12", date, "07:45", "GMT+12", "Cirrus SF50", 4, 299);
  addFlight(`DF${base + 1}`, "NZRO", "NZNE", date, "08:30", "GMT+12", date, "09:15", "GMT+12", "Cirrus SF50", 4, 299);
  addFlight(`DF${base + 2}`, "NZNE", "NZRO", date, "16:30", "GMT+12", date, "17:15", "GMT+12", "Cirrus SF50", 4, 299);
  addFlight(`DF${base + 3}`, "NZRO", "NZNE", date, "18:00", "GMT+12", date, "18:45", "GMT+12", "Cirrus SF50", 4, 299);
});

addFlight("DF100", "NZNE", "YSSY", "2026-05-29", "10:00", "GMT+12", "2026-05-29", "13:30", "GMT+10", "SyberJet SJ30i", 6, 1200);
addFlight("DF101", "YSSY", "NZNE", "2026-05-31", "15:00", "GMT+10", "2026-05-31", "20:30", "GMT+12", "SyberJet SJ30i", 6, 1200);
addFlight("DF102", "NZNE", "YSSY", "2026-06-05", "10:00", "GMT+12", "2026-06-05", "13:30", "GMT+10", "SyberJet SJ30i", 6, 1200);
addFlight("DF103", "YSSY", "NZNE", "2026-06-07", "15:00", "GMT+10", "2026-06-07", "20:30", "GMT+12", "SyberJet SJ30i", 6, 1200);

["2026-05-25", "2026-05-27", "2026-05-29", "2026-06-01", "2026-06-03", "2026-06-05"].forEach((date, i) => {
  addFlight(`DF3${i}0`, "NZNE", "NZGB", date, "09:00", "GMT+12", date, "09:50", "GMT+12", "Cirrus SF50", 4, 350);
});

["2026-05-26", "2026-05-28", "2026-05-30", "2026-06-02", "2026-06-04", "2026-06-06"].forEach((date, i) => {
  addFlight(`DF3${i}1`, "NZGB", "NZNE", date, "09:00", "GMT+12", date, "09:50", "GMT+12", "Cirrus SF50", 4, 350);
});

["2026-05-26", "2026-05-29", "2026-06-02", "2026-06-05"].forEach((date, i) => {
  addFlight(`DF4${i}0`, "NZNE", "NZCI", date, "11:00", "GMT+12", date, "14:15", "GMT+12:45", "HondaJet Elite", 5, 650);
});

["2026-05-27", "2026-05-30", "2026-06-03", "2026-06-06"].forEach((date, i) => {
  addFlight(`DF4${i}1`, "NZCI", "NZNE", date, "10:00", "GMT+12:45", date, "11:20", "GMT+12", "HondaJet Elite", 5, 650);
});

addFlight("DF500", "NZNE", "NZTL", "2026-05-25", "13:00", "GMT+12", "2026-05-25", "15:00", "GMT+12", "HondaJet Elite", 5, 450);
addFlight("DF501", "NZTL", "NZNE", "2026-05-26", "10:00", "GMT+12", "2026-05-26", "12:00", "GMT+12", "HondaJet Elite", 5, 450);
addFlight("DF502", "NZNE", "NZTL", "2026-06-01", "13:00", "GMT+12", "2026-06-01", "15:00", "GMT+12", "HondaJet Elite", 5, 450);
addFlight("DF503", "NZTL", "NZNE", "2026-06-02", "10:00", "GMT+12", "2026-06-02", "12:00", "GMT+12", "HondaJet Elite", 5, 450);