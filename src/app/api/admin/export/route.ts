import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAllRegistrations } from "@/lib/registration-service";

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || "afterclass-founder-2026";
const COOKIE_NAME = "afterclass_admin_session";

async function isAuthorized(request: Request): Promise<boolean> {
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    if (authHeader.substring(7) === ADMIN_SECRET) return true;
  }
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  return Boolean(session && session.value === "authorized_founder_session");
}

function escapeCsvCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '""';
  const stringValue = String(value);
  if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return `"${stringValue}"`;
}

export async function GET(request: Request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const registrations = await getAllRegistrations();

    const headers = [
      "Registration ID",
      "Registration Timestamp",
      "Customer Name",
      "Customer Email",
      "Optional Phone Number",
      "Product",
      "Colour",
      "Size",
      "Requested Quantity",
      "Referral Source",
      "Contact Consent",
      "Registration Status",
      "Internal Notification Status",
      "Customer Email Status",
      "Spreadsheet Sync Status",
    ];

    const rows = registrations.map((r) => [
      escapeCsvCell(r.registration_id),
      escapeCsvCell(new Date(r.created_at).toISOString()),
      escapeCsvCell(r.customer_name),
      escapeCsvCell(r.customer_email),
      escapeCsvCell(r.phone || ""),
      escapeCsvCell(r.product_name),
      escapeCsvCell(r.colour),
      escapeCsvCell(r.size),
      escapeCsvCell(r.quantity),
      escapeCsvCell(r.referral_source || "website"),
      escapeCsvCell(r.consent ? "TRUE" : "FALSE"),
      escapeCsvCell(r.status),
      escapeCsvCell(r.internal_email_status),
      escapeCsvCell(r.customer_email_status),
      escapeCsvCell(r.sheets_sync_status),
    ]);

    const csvContent = [headers.map((h) => `"${h}"`).join(","), ...rows.map((row) => row.join(","))].join("\n");

    const filename = `afterclass-registrations-${new Date().toISOString().split("T")[0]}.csv`;

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Error generating CSV";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
