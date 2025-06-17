import { db } from "../firebase"; 
import { collection, addDoc, onSnapshot, query, where, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

function TicketDetail({ ticket }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!ticket?.id) return;

    const q = query(
      collection(db, "comments"),
      where("ticketId", "==", ticket.id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      data.sort((a, b) => a.timestamp?.seconds - b.timestamp?.seconds);
      setComments(data);
    });

    return () => unsubscribe();
  }, [ticket.id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      ticketId: ticket.id,
      text: comment,
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "comments"), newComment);
      setComment(""); 
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };


  return (
    <div className="ticket-detail">
      <h3>{ticket.title}</h3>
      <p>
        Status: <strong>{ticket.status}</strong>
      </p>
      <p>Opened:{" "}{ticket.openedDate?.toDate?.()? ticket.openedDate.toDate().toLocaleString(): "Not available"}</p>

      <hr />

      <h4>Comments:</h4>
      <ul className="comments-list">
        {comments.length > 0 ? (
          comments.map((c) => (
            <li key={c.id}>
              <div>{c.text}</div>
              <small>{c.timestamp?.toDate?.()? c.timestamp.toDate().toLocaleString(): "Time not available"}</small>

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
