import { signOut } from "@/lib/actions/auth.actions";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const result = await signOut();
    
    if (result.success) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, error: "Failed to sign out" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error during API sign out:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
} 