import {useState } from "react";   
import { useNavigate } from "react-router-dom";

function Login(){
    const [email, setEmail]=useState('')
    const[password , setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()

        if (email && password){
            console.log("Logging in with:", { email, password })
            localStorage.setItem('token', 'mock-auth-token')
            setEmail('');
            setPassword('');

            navigate('/login')
        }else{
            alert('Please fill all fields')}
    }

    return(
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
    
export default Login