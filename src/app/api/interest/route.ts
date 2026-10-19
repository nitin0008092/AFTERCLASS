import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Memory storage fallback if Supabase credentials are not yet configured in local development
interface InterestEntry {
  name: string;
  mobile: string;
  email?: string;
  city?: string;
  productName: string;
  color: string;
  size: string;
  created_at: string;
}

const memoryProductInterests: InterestEntry[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobile, email, city, productName, color, size } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 }
      );
    }

    const cleanMobile = typeof mobile === "string" ? mobile.trim().replace(/\D/g, "") : "";
    if (cleanMobile.length < 10 || cleanMobile.length > 13) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = typeof email === "string" && email.trim() ? email.trim().toLowerCase() : null;
    const cleanCity = typeof city === "string" && city.trim() ? city.trim() : null;
    const selectedProduct = productName || "On a Diet (Coke) Heavyweight Tee";
    const selectedColor = color || "Washed Black";
    const selectedSize = size || "L";

    if (supabase) {
      const { data, error } = await supabase
        .from("product_interest")
        .insert([
          {
            name: cleanName,
            mobile: cleanMobile,
            email: cleanEmail,
            city: cleanCity,
            product_name: selectedProduct,
            color: selectedColor,
            size: selectedSize,
          },
        ])
        .select();

      if (error) {
        return NextResponse.json(
          { error: "Database error. Please try again shortly." },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "You're prioritized! We will WhatsApp / SMS you the moment stock drops.",
          data,
        },
        { status: 201 }
      );
    }

    // In-memory fallback
    memoryProductInterests.push({
      name: cleanName,
      mobile: cleanMobile,
      email: cleanEmail || undefined,
      city: cleanCity || undefined,
      productName: selectedProduct,
      color: selectedColor,
      size: selectedSize,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "You're prioritized! We will WhatsApp / SMS you the moment stock drops.",
        mode: "local_memory_fallback",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
