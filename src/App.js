/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
// import { app } from './firebase-config';

import {
  FirebaseAuthProvider,
  useFirebaseAuth,
} from './context/FirebaseAuthContext';
import Homepage from './components/Homepage';
import Auth from './components/Auth';
import Playlists from './components/Playlist/Playlists';
import PlayDetail from './components/Playlist/PlayDetail';
import MovieDetail from './components/Movie/MovieDetail';
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');
    if (!authToken) {
      navigate('/login');
    }
  }, []);
  // const user = useFirebaseAuth();
  // console.log(user);
  // useEffect(() => {
  //   if (!user) {
  //     navigate('/');
  //   }
  // }, [user]);
  return (
    <FirebaseAuthProvider>
      <div className="">
        <Routes>
          <Route path="signup" element={<Auth title={'Signup'} />} />
          <Route path="login" element={<Auth title={'Login'} />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlists/:id" element={<PlayDetail />} />
        </Routes>
      </div>
    </FirebaseAuthProvider>
  );
}

export default App;
