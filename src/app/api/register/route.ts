import { NextResponse } from "next/server";
import { processInterestRegistration } from "@/lib/registration-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, instagram, phone, mobile, referralSource, honeypot } = body;

    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const ref = referralSource || (instagram ? `instagram:@${instagram.replace(/^@/, "")}` : "website_hero");

    const result = await processInterestRegistration({
      name: name || "",
      email: email || "",
      phone: phone || mobile || "",
      productName: "DROP 01 // GENERAL EARLY ACCESS",
      colour: "Washed Black / Off-White",
      size: "Oversized",
      quantity: 1,
      referralSource: ref,
      consent: true,
      honeypot,
      clientIp,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(
      {
        success: true,
        registrationId: result.registrationId,
        alreadyRegistered: result.alreadyRegistered,
        message: result.message,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
