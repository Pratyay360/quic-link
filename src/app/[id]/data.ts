import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { createServer } from "@/lib/supabase/server";

export async function getData(id: string): Promise<{ id: any; initialText: any } | { redirectUrl: string } | null> {
  const supabase = await createServer();
  const length = id.length;

  if (length === 6) {
    // Handle shared text
    const { data: sharedtext, error } = await supabase
      .from("sharedtext")
      .select("shared_text")
      .match({ id: id })
      .single();

    if (error || !sharedtext) {
      notFound();
    }

    const initialText = sharedtext.shared_text;
    if (initialText) {
      return { id, initialText };
    }
    
    notFound();
  } else if (length >= 7) {
    // Handle short URLs
    const { data: shorturls, error } = await supabase
      .from("shorturls")
      .select("large_url")
      .match({ id: id })
      .single();

    if (error || !shorturls) {
      notFound();
    }

    const redirectUrl = shorturls.large_url;
    if (redirectUrl) {
      return { redirectUrl };
    }
    
    notFound();
  } else {
    notFound();
  }
  
  return null;
}