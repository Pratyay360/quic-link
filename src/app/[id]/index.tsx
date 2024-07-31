import { createClient } from "@/../utils/supabase/server";
import openUrl from "./openUrl";
import { useRouter } from "next/router";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Copy, Trash2 } from "lucide-react";
const supabase = createClient();

async function deleteText(id: string) {
  const { data, error } = await supabase
    .from("sharedtext")
    .delete()
    .eq("id", id);
  toast.warning("Text deleted");
  if (error) {
    toast.error("Error deleting text");
  }
}
async function getText(id: string) {
  const { data, error } = await supabase
    .from("sharedtext")
    .select("*")
    .eq("id", id);
  if (error) {
    toast.error("Error fetching text");
  }
  return data;
}

export default async function Home({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const id = { params };
  let len = params.slug.length;
  if (len === 8) {
    const { data, error } = await supabase
      .from("shorturl")
      .select("*")
      .eq("id", id.params.slug);
    if (data) {
      return openUrl(data[0]?.url);	
    } else {
      router.push("/404");
      return null;
    }
  } else if (len === 6) {
    const data = await getText(params.slug);
    return (
      <>
        <Toaster richColors closeButton position="bottom-right" expand={true} />
        <div>
          <div>
            <textarea value={data && data[0]?.text} readOnly></textarea>
            <Button
              onClick={() => {
                if (data) {
                  navigator.clipboard.writeText(data[0]?.text);
                }
              }}
            >
              <Copy size={24} />
              Copy
            </Button>
          </div>
          <Button onClick={() => deleteText(params.slug)}>
            <Trash2 size={24} />
            Delete
          </Button>
        </div>
      </>
    );
  } else {
    router.push("/404");
    return null;
  }
}
