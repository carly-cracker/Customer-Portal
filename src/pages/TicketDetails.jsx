import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TicketDetail from "../components/TicketDetail";
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "../firebase"; 

function TicketDetails() {
  const { id } = useParams(); 
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "tickets", id),
      (docSnap) => {
        if (docSnap.exists()) {
          setTicket({ id: docSnap.id, ...docSnap.data() });
          setLoading(false);
        } else {
          setError("Ticket not found");
          setLoading(false);
        }
      },
      (err) => {
        console.error("Error fetching ticket:", err);
        setError("Failed to fetch ticket.");
        setLoading(false);
      }
    );

    return () => unsub(); 
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
