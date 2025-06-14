import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email && password) {
      console.log("Signup form submitted", { name, email, password });
      localStorage.setItem("token", "mock-signup-token");

      setName("");
      setEmail("");
      setPassword("");
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        navigate("/login");
      }, 200); 
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      {success && <div className="success-message">Signup successful! Redirecting to login...</div>}

      <form onSubmit={handleSubmit} className="signup-form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>

      <p className="login-redirect">
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
    </div>
  );
}

export default Signup;