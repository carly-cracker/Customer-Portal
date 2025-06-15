function TicketDisplay({ ticket }) {
  return (
    <div className="ticket-card">
      <h3>{ticket.title}</h3>
      <p>Status: {ticket.status}</p>
      <p>Opened: {new Date(ticket.openedDate).toLocaleString()}</p>
    </div>
  );
}

export default TicketDisplay;
