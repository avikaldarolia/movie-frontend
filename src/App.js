/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { app } from './firebase-config';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import Homepage from './components/Homepage';
import MovieDetail from './components/MovieDetail';
import Auth from './components/Auth';
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');

    if (authToken) {
      navigate('/');
    }
  }, []);
  return (
    <div className="">
      <Routes>
        <Route path="signup" element={<Auth title={'Signup'} />} />
        <Route path="login" element={<Auth title={'Login'} />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/detail" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;
