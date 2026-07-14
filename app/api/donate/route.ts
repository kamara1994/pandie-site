import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      donorName,
      donorEmail,
      donorMessage,
      donationType,
      currency,
      amount,
    } = body;

    if (!donorName || !donorEmail || !amount || amount <= 0) {
      return NextResponse.json(
        { error: "Missing or invalid donation information." },
        { status: 400 }
      );
    }

    console.log("Donation received:", {
      donorName,
      donorEmail,
      donorMessage,
      donationType,
      currency,
      amount,
    });

    return NextResponse.json({
      success: true,
      message: "Donation data received successfully.",
    });
  } catch {
    return NextResponse.json(
      { error: "Server error processing donation." },
      { status: 500 }
    );
  }
}