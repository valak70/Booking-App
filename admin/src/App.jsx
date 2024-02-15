import { useState,useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login/Login'

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"; 
import { DarkModeContext } from './context/darkModeContext'
import Home from './pages/home/Home'
import { AuthContext } from './context/AuthContext'
import { userColumns } from './datatablesource'
import List from './pages/list/List'


function App() {
  // const [count, setCount] = useState(0)
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }></Route>
        <Route path='/users' element={
          <ProtectedRoute>
            <List columns={userColumns}/>
          </ProtectedRoute>
        }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
