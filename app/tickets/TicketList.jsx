import Link from "next/link";

async function getTickets() {
  const res = await fetch("http://localhost:4000/tickets",{
    next: {
      revalidate: 0 // use 0 to opt out of using cache
    }
  });
  
  return res.json();
}

export default async function TicketList() {
  // await new Promise(resolve => setTimeout(resolve, 1000))
  const tickets = await getTickets();
  return (
    <>
      {tickets.map((ticket) => {
        return (
          <div className="card my-5" key={ticket.id}>
            <Link href={`/tickets/${ticket.id}`}>
              <h3>{ticket.title}</h3>
              <p>{ticket.body.slice(0, 200)} ...</p>
              <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priority
              </div>
            </Link>
          </div>
        );
      })}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  );
}
