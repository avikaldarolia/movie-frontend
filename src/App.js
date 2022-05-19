/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
// import { app } from './firebase-config';
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from 'firebase/auth';
import {
  FirebaseAuthProvider,
  useFirebaseAuth,
} from './context/FirebaseAuthContext';
import Homepage from './components/Homepage';
import MovieDetail from './components/MovieDetail';
import Auth from './components/Auth';
import Playlists from './components/Playlists';
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');

    if (authToken) {
      navigate('/');
    }
  }, []);
  const user = useFirebaseAuth();
  console.log(user);
  // useEffect(() => {
  //   if (!user) {
  //     navigate('/');
  //   }
  // }, [user]);
  return (
    // <FirebaseAuthProvider>
    <div className="">
      <Routes>
        <Route path="signup" element={<Auth title={'Signup'} />} />
        <Route path="login" element={<Auth title={'Login'} />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/detail" element={<MovieDetail />} />
        <Route path="/playlists" element={<Playlists />} />
      </Routes>
    </div>
    // </FirebaseAuthProvider>
  );
}

export default App;
