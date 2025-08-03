"use server";

import { createServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteSharedText(id: string) {
  const supabase = await createServer();
  const { error } = await supabase.from("sharedtext").delete().eq("id", id);

  if (error) {
    console.error("Error deleting data:", error);
    throw new Error("Error deleting data");
  }

  revalidatePath("/");
  redirect("/");
}
