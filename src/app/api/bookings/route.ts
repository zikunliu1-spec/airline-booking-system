import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

type Booking = {
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
  createdAt?: string;
  cancelledAt?: string;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const email = searchParams.get("email");
    const bookingReference = searchParams.get("bookingReference");
    const flightNumber = searchParams.get("flightNumber");

    const client = await clientPromise;
    const db = client.db("airlineBookingSystem");
    const bookingsCollection = db.collection<Booking>("bookings");

    const query: Partial<Booking> = {};

    if (email) {
      query.email = email;
    }

    if (bookingReference) {
      query.bookingReference = bookingReference;
    }

    if (flightNumber) {
      query.flightNumber = flightNumber;
      query.status = "Confirmed";
    }

    const bookings = await bookingsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch bookings",
        error: String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const booking: Booking = await request.json();

    const client = await clientPromise;
    const db = client.db("airlineBookingSystem");
    const bookingsCollection = db.collection<Booking>("bookings");

    const existingBooking = await bookingsCollection.findOne({
      bookingReference: booking.bookingReference,
    });

    if (existingBooking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking reference already exists",
        },
        { status: 409 }
      );
    }

    await bookingsCollection.insertOne({
      ...booking,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create booking",
        error: String(error),
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { bookingReference } = await request.json();

    if (!bookingReference) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking reference is required",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("airlineBookingSystem");
    const bookingsCollection = db.collection<Booking>("bookings");

    const booking = await bookingsCollection.findOne({
      bookingReference,
    });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found",
        },
        { status: 404 }
      );
    }

    if (booking.status === "Cancelled") {
      return NextResponse.json({
        success: true,
        message: "This booking has already been cancelled.",
        booking,
      });
    }

    await bookingsCollection.updateOne(
      { bookingReference },
      {
        $set: {
          status: "Cancelled",
          cancelledAt: new Date().toISOString(),
        },
      }
    );

    const updatedBooking = await bookingsCollection.findOne({
      bookingReference,
    });

    return NextResponse.json({
      success: true,
      message: "Booking cancelled successfully.",
      booking: updatedBooking,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to cancel booking",
        error: String(error),
      },
      { status: 500 }
    );
  }
}