import { getData } from "./data";
import SharedTextCard from "./SharedTextCard";
import { deleteSharedText } from "./actions";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const data = await getData(params.id);

  // Handle redirect case (for short URLs)
  if (data && "redirectUrl" in data) {
    redirect(data.redirectUrl);
  }

  // Handle shared text case
  if (data && "id" in data && "initialText" in data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-100 dark:bg-slate-800 p-4">
        <SharedTextCard
          id={data.id}
          initialText={data.initialText}
          onDelete={deleteSharedText}
        />
      </div>
    );
  }

  // Fallback if data is invalid (shouldn’t happen if getData is correct)
  notFound();
}
