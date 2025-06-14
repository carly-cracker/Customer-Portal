import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/tickets' element={<Tickets/>}/>
      <Route path='/tickets/:id' element={<TicketDetail/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
