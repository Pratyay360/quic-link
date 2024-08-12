import { redirect } from "next/navigation";
import { createClient } from "@/../utils/supabase/server";
import SharedTextCard from "./SharedTextCard";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const length = id.length;
  const supabase = await createClient();
  let datas: string = "";

  if (length == 6) {
    const { data: sharedtext } = await supabase
      .from("sharedtext")
      .select("*")
      .match({ id: id });
    if (sharedtext) {
      let dat = sharedtext[0]?.shared_text;
      if (dat) {
        datas = dat;
      } else {
        redirect("/datanotfound");
      }
    } else {
      redirect("/");
    }
  } else if (length >= 6) {
    const { data: shorturls } = await supabase
      .from("shorturls")
      .select("large_url")
      .match({ id: id });
    if (shorturls) {
      redirect(shorturls[0]?.large_url);
    } else {
      redirect("/datanotfound");
    }
  } else {
    redirect("/");
  }

  async function deleteData(id: string) {
    "use server";
    const supabase = await createClient();
    const { error } = await supabase.from("sharedtext").delete().eq("id", id);
    if (error) {
      throw error;
    } else {
      redirect("/");
    }
  }

  return (
    <>
      {length == 6 ? (
        <SharedTextCard id={id} initialText={datas} onDelete={deleteData} />
      ) : (
        <>{JSON.stringify(datas)}</>
      )}
    </>
  );
}
