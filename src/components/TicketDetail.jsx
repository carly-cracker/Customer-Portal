import { useEffect, useState } from "react";

function TicketDetail({ ticket }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://customer-portal-server.vercel.app/comments?ticketId=${ticket.id}`)
      .then((res) => res.json())
      .then(setComments)
      .catch((err) => console.error("Failed to load comments", err));
  }, [ticket.id]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      ticketId: ticket.id,
      text: comment,
      timestamp: new Date().toISOString(),
    };

    fetch("https://customer-portal-server.vercel.app/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((res) => res.json())
      .then((data) => {
        setComments([...comments, data]);
        setComment("");
      })
      .catch((err) => console.error("Error posting comment:", err));
  };

  return (
    <div className="ticket-detail">
      <h3>{ticket.title}</h3>
      <p>
        Status: <strong>{ticket.status}</strong>
      </p>
      <p>Opened: {new Date(ticket.openedDate).toLocaleString()}</p>

      <hr />

      <h4>Comments:</h4>
      <ul className="comments-list">
        {comments.length > 0 ? (
          comments.map((c) => (
            <li key={c.id}>
              <div>{c.text}</div>
              <small>{new Date(c.timestamp).toLocaleString()}</small>
            </li>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </ul>

      <form onSubmit={handleAddComment} className="comment-form">
        <textarea
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

export default TicketDetail;
