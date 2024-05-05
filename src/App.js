import './App.css';
import React, { useState } from 'react';
import AuthContext from './AuthContext';
import Signup from './pages/signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';

function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
   <Router>
    <Routes>
      <Route path="/" element = {<Signup />} />
      <Route path="/home" element = {<Home />} />
      <Route path="/login" element = {<Login />} />
    </Routes>
   </Router>
   </AuthContext.Provider>
  );
}

export default App;