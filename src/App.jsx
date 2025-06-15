import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from "./components/Header";
import TicketDetails from './pages/TicketDetails';
import Home from './pages/Home';
import './App.css'
import Tickets from './pages/Tickets';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path ='/' element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route  path='/tickets' element={<Tickets/>}/>
        <Route path='/tickets/:id' element={<TicketDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
