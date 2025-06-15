import { useEffect, useState } from "react";
import TicketList from "../components/TicketList";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/tickets")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched tickets:", data);
        setTickets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch tickets:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading tickets...</p>;

  return (
    <div className="tickets-page">
      <h2>All Tickets</h2>
      <TicketList tickets={tickets} />
    </div>
  );
}

export default Tickets;
