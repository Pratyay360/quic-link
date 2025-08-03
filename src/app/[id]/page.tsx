import { getData } from "./data";
import SharedTextCard from "./SharedTextCard";
import { deleteSharedText } from "./actions";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getData(id);

  if (!data) {
    notFound();
  }

  if ("redirectUrl" in data) {
    redirect(data.redirectUrl);
  }

  if ("id" in data && "initialText" in data) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <SharedTextCard
          id={data.id}
          initialText={data.initialText}
          onDelete={deleteSharedText}
        />
      </div>
    );
  }

  notFound();
}
