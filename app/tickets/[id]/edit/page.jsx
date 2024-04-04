import { notFound } from "next/navigation";
import EditForm from "./EditForm";

async function getTicket(id) {
  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 0, // use 0 to opt out of using cache
    },
  });
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default async function Edit({ params }) {
  const ticket = await getTicket(params.id);

  return (
    <main>
      <h2 className="text-primary text-center">Edit ticket</h2>
      <EditForm ticket={ticket} />
    </main>
  );
}
