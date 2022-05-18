import React from 'react';
import { Route, Routes } from 'react-router';
import Homepage from './components/Homepage';
import Login from './components/Login';
import MovieDetail from './components/MovieDetail';
import Signup from './components/Signup';
function App() {
  return (
    <div className="">
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/detail" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;
