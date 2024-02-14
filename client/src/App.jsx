import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"; 
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from './pages/hotel/Hotel';
import Login from './pages/login/Login';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Home/>}></Route>
      <Route path = "/hotels" element = {<List/>}></Route>
      <Route path = "/hotels/:id" element = {<Hotel/>}></Route>
      <Route path = "/login" element = {<Login/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App
