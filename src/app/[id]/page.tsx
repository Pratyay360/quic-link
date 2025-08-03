import { getData } from "./data";
import SharedTextCard from "./SharedTextCard";
import { deleteSharedText } from "./actions";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);

  // Handle redirect case (for short URLs)
  if (data && 'redirectUrl' in data) {
    redirect(data.redirectUrl);
  }

  // Handle shared text case
  if (data && 'id' in data && 'initialText' in data) {
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

  // This case should be handled by getData calling notFound()
  return null;  
}