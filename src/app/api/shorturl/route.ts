import { createClient } from "@/../utils/supabase/server";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createClient();
  const { text } = await request.json();

  const short = "abcdefghijklmnopqrstuvwxyz";
  const capital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const all = short + capital + numbers;
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += all[Math.floor(Math.random() * all.length)];
  }

  const { data, error } = await supabase
    .from("shorturls")
    .insert([{ id: result, large_url: text }]);

  if (error) {
    return NextResponse.json({ error: 'Error shorting url' }, { status: 500 });
  } else {
    return NextResponse.json({ id: result });
  }
}