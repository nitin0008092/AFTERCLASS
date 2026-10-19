import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || "afterclass-founder-2026";
const COOKIE_NAME = "afterclass_admin_session";

export async function POST(request: Request) {
  try {
    const { passkey, founderEmail } = await request.json();

    if (!passkey || passkey !== ADMIN_SECRET) {
      return NextResponse.json(
        { error: "Invalid founder authentication key. Access denied." },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, "authorized_founder_session", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: `Welcome, ${founderEmail || "Founder"}. Authorized access granted.`,
    });
  } catch {
    return NextResponse.json({ error: "Authentication failed." }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);

  if (session && session.value === "authorized_founder_session") {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return NextResponse.json({ success: true, message: "Logged out successfully." });
}
