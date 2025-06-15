import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TicketDetail from "../components/TicketDetail";

function TicketDetails() {
  const { id } = useParams(); // Get the ticket ID from the URL
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://customer-portal-server.vercel.app/tickets/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch ticket.");
        }
        return res.json();
      })
      .then((data) => {
        setTicket(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Ticket not found");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading ticket...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="ticket-details-page">
      <h2>Ticket Details</h2>
      <TicketDetail ticket={ticket} />
    </div>
  );
}

export default TicketDetails;
