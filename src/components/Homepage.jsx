/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useFirebaseAuth } from '../context/FirebaseAuthContext';
import Navbar from './Navbar';
import SearchBar from './SearchBar';

const Homepage = () => {
  // const navigate = useNavigate();
  const user = useFirebaseAuth();
  console.log(user);
  // useEffect(() => {
  //   let authToken = sessionStorage.getItem('Auth Token');

  //   if (authToken) {
  //     navigate('/');
  //   }
  //   if (!authToken) {
  //     navigate('/login');
  //   }
  // }, []);
  return (
    <div className="flex flex-col">
      <Navbar />
      <SearchBar />
      {/* {user? } */}
    </div>
  );
};

export default Homepage;
