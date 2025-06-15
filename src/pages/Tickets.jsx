import { useEffect, useState } from "react";
import TicketList from "../components/TicketList";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchTickets = () => {
      fetch("https://customer-portal-server.vercel.app/tickets")
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched tickets:", data);
          setTickets(data);
          setLastUpdated(new Date()); 
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch tickets:", err);
          setLoading(false);
        });
    };

    fetchTickets(); // Initial fetch

    const intervalId = setInterval(fetchTickets, 30000); 

    return () => clearInterval(intervalId); 
  }, []);

  if (loading) return <div className='spinner'></div>

  return (
    <div className="tickets-page">
      <h2>All Tickets</h2>
      {lastUpdated && (
        <p style={{ fontSize: "0.9rem", color: "#666" }}>
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      )}
      <TicketList tickets={tickets} />
    </div>
  );
}

export default Tickets;
