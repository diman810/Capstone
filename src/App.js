import './App.css';

import Homepage from './components/Homepage'
import About from './components/About'
import Menu from './components/Menu'
import Reservations from './components/Reservations'
import Order from './components/Order'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/reservations" element={<Reservations />}></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
