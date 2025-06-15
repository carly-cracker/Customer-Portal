import { useEffect, useState } from "react";
import TicketList from "../components/TicketList";
import { collection, onSnapshot } from "firebase/firestore";
import {db} from "../firebase";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tickets"), (snapshot) => {
        const ticketData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setTickets(ticketData);
        setLoading(false);
    });

    return () => unsub(); 
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
