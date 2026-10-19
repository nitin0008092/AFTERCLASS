import { NextResponse } from "next/server";
import { processInterestRegistration } from "@/lib/registration-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      mobile,
      phone,
      productName,
      color,
      colour,
      size,
      quantity,
      referralSource,
      consent,
      honeypot,
    } = body;

    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const result = await processInterestRegistration({
      name: name || "",
      email: email || "",
      phone: phone || mobile || "",
      productName: productName || "ON A DIET (COKE)",
      colour: colour || color || "Washed Black",
      size: size || "L",
      quantity: quantity ? Number(quantity) : 1,
      referralSource: referralSource || "product_page",
      consent: consent !== undefined ? Boolean(consent) : true,
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
        details: {
          productName: result.record?.product_name,
          colour: result.record?.colour,
          size: result.record?.size,
          quantity: result.record?.quantity,
        },
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
