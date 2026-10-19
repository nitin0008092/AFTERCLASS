import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Memory storage fallback if Supabase credentials are not yet configured in local development
const memoryRegistrations: Array<{
  name: string;
  email: string;
  instagram?: string;
  created_at: string;
}> = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, instagram } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanInstagram =
      typeof instagram === "string" && instagram.trim()
        ? instagram.trim().replace(/^@/, "")
        : null;

    // Check if Supabase client is connected
    if (supabase) {
      const { data, error } = await supabase
        .from("launch_registrations")
        .insert([
          {
            name: cleanName,
            email: cleanEmail,
            instagram: cleanInstagram,
          },
        ])
        .select();

      if (error) {
        // Handle unique constraint violations gracefully
        if (error.code === "23505") {
          return NextResponse.json(
            {
              message: "You're already on the list! We'll notify you when the drop happens.",
              alreadyRegistered: true,
            },
            { status: 200 }
          );
        }
        return NextResponse.json(
          { error: "Database error. Please try again shortly." },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "You're confirmed for early drop access.",
          data,
        },
        { status: 201 }
      );
    }

    // Fallback: In-memory simulation when Supabase env variables aren't provided yet
    const alreadyExists = memoryRegistrations.some(
      (entry) => entry.email === cleanEmail
    );

    if (alreadyExists) {
      return NextResponse.json(
        {
          message: "You're already on the list! We'll notify you before December 31, 2026.",
          alreadyRegistered: true,
        },
        { status: 200 }
      );
    }

    memoryRegistrations.push({
      name: cleanName,
      email: cleanEmail,
      instagram: cleanInstagram || undefined,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "You're confirmed for early drop access.",
        mode: "local_memory_fallback",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
