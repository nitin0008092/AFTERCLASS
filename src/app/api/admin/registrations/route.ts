import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAllRegistrations, updateRegistrationStatus } from "@/lib/registration-service";

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || "afterclass-founder-2026";
const COOKIE_NAME = "afterclass_admin_session";

async function isAuthorized(request: Request): Promise<boolean> {
  // Check Authorization Bearer header
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    if (token === ADMIN_SECRET) return true;
  }

  // Check HttpOnly session cookie
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  return Boolean(session && session.value === "authorized_founder_session");
}

export async function GET(request: Request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const registrations = await getAllRegistrations();

    // Compute aggregated metrics for founders
    const totalCount = registrations.length;

    const byProduct: Record<string, number> = {};
    const bySize: Record<string, number> = {};
    const byColour: Record<string, number> = {};
    const byReferral: Record<string, number> = {};
    let totalPiecesRequested = 0;

    for (const r of registrations) {
      byProduct[r.product_name] = (byProduct[r.product_name] || 0) + 1;
      bySize[r.size] = (bySize[r.size] || 0) + 1;
      byColour[r.colour] = (byColour[r.colour] || 0) + 1;
      const ref = r.referral_source || "direct";
      byReferral[ref] = (byReferral[ref] || 0) + 1;
      totalPiecesRequested += r.quantity || 1;
    }

    const integrationsStatus = {
      supabaseConfigured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      resendConfigured: Boolean(process.env.RESEND_API_KEY),
      googleSheetsConfigured: Boolean(
        process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_SHEET_ID
      ),
      notifyEmail: process.env.AFTERCLASS_NOTIFY_EMAIL || "afterclass121@gmail.com",
    };

    return NextResponse.json({
      registrations,
      metrics: {
        totalRegistrations: totalCount,
        totalPiecesRequested,
        byProduct,
        bySize,
        byColour,
        byReferral,
      },
      integrationsStatus,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Error fetching registrations";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { registrationId, status } = await request.json();

    if (!registrationId || !["pending", "reviewed", "contacted", "vip"].includes(status)) {
      return NextResponse.json({ error: "Invalid status or registration ID" }, { status: 400 });
    }

    const updated = await updateRegistrationStatus(registrationId, status);
    if (!updated) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Status updated to ${status}` });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Error updating status";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
