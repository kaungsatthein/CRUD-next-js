import { notFound } from "next/navigation";
import DeleteButton from "@/app/components/RemoveButton";
import EditButton from "@/app/components/EditButton";

export const dynamicParams = true;

export async function generateStaticParams() {
  const res = await fetch("http://localhost:4000/tickets");
  const tickets = await res.json();
  return tickets.map((ticket) => {
    id: ticket.id;
  });
}

async function getTicket(id) {
  const res = await fetch(`http://localhost:4000/tickets/${id}`,{
    next: {
      revalidate: 0 // use 0 to opt out of using cache
    }
  });
  if (!res.ok) {
    notFound();
  }
  
  return res.json();
}

export default async function TicketDetails({ params }) {
  const ticket = await getTicket(params.id);
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <div className=" flex items-center justify-between">
          <h3>{ticket.title}</h3>
          <div className=" flex items-center">
            <EditButton id={ticket.id}/>
            <DeleteButton id={ticket.id} />
          </div>
        </div>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
