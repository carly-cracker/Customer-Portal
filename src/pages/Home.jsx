import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import {db} from "../firebase";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tickets, setTickets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    priority: "Low"
  });

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tickets"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTickets(data);
      setFiltered(data);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching tickets:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const results = tickets.filter(ticket =>
      ticket.title.toLowerCase().includes(term) ||
      ticket.id.toString().includes(term)
    );
    setFiltered(results);
  };

  const handleInputChange = (e) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value });
  };

  const handleSubmitTicket = async (e) => {
    e.preventDefault();

    if (!newTicket.title || !newTicket.description) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "tickets"), {
        ...newTicket,
        status: "open",
        openedDate: serverTimestamp(),
      });

      setNewTicket({ title: "", description: "", priority: "Low" });
      alert("Ticket submitted successfully!");
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Failed to submit ticket. Try again.");
    }
  };

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="home-container">
      <header className="header">
        <h2>Customer Support Portal</h2>
        <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <div className="search-section">
        <h3>Search Existing Tickets</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search tickets by title or ID"
          className="search-input"
        />
        <ul className="search-results">
          {filtered.map(ticket => (
            <li key={ticket.id}>
              <Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="new-ticket-section">
        <h3>Submit a New Ticket</h3>
        <form onSubmit={handleSubmitTicket} className="ticket-form">
          <input
            type="text"
            name="title"
            placeholder="Ticket Title"
            value={newTicket.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Describe your issue..."
            value={newTicket.description}
            onChange={handleInputChange}
            required
          />
          <select
            name="priority"
            value={newTicket.priority}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
          <button type="submit">Submit Ticket</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
