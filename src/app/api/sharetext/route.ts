import { createClient } from "@/../utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    if (!supabase) {
      throw new Error("Failed to initialize Supabase client");
    }

    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const short = "abcdefghijklmnopqrstuvwxyz";
    const capital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const all = short + capital + numbers;
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += all[Math.floor(Math.random() * all.length)];
    }

    const { data, error } = await supabase
      .from("sharedtext")
      .insert([{ id: result, shared_text: text }]);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Error sharing text" }, { status: 500 });
    }

    return NextResponse.json({ id: result });
  } catch (err) {
    console.error("Unhandled error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
