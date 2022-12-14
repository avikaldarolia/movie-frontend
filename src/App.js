/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';

import Cookies from 'js-cookie';
import Homepage from './components/Homepage';
import Auth from './components/Auth';
import Playlists from './components/Playlist/Playlists';
import PlayDetail from './components/Playlist/PlayDetail';
import MovieDetail from './components/Movie/MovieDetail';
import PlayEdit from './components/Playlist/PlayEdit';
import NotFound from './components/NotFound';
import PrivateRoutes from './utils/PrivateRoute';
import Friends from './components/Friends/Friends';
import Profile from './components/Profile/Profile';

function App() {
  const navigate = useNavigate();
  let jwt = Cookies.get('jwt')
  console.log(jwt);
  useEffect(() => {
    if (!jwt) {
      navigate('/login');
    }
  }, [jwt]);
  return (
    // <div className="">
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlists/:id" element={<PlayDetail />} />
        <Route path="/playlists/edit/:id" element={<PlayEdit />} />
        {/* <Route path="signup" action={() => <Navigate to='/'} element={<Homepage />} />
        <Route path="login" element={<Homepage />} /> */}
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="signup" element={<Auth title={'Signup'} />} />
      <Route path="login" element={<Auth title={'Login'} />} />
    </Routes>
    // </div>
  );
}

export default App;
