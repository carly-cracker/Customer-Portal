import { useNavigate } from "react-router-dom";
import TicketDisplay from "./TicketDisplay";

function TicketList({ tickets = [] }) {
  const navigate = useNavigate();

  if (!tickets.length) return <p>No tickets found.</p>;

  return (
    <div className="ticket-list">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          onClick={() => navigate(`/tickets/${ticket.id}`)}
          style={{ cursor: "pointer" }}
        >
          <TicketDisplay ticket={ticket} />
        </div>
      ))}
    </div>
  );
}


export default TicketList;
