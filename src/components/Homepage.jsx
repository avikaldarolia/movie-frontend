/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
// import { useNavigate } from 'react-router';
import { useFirebaseAuth } from '../context/FirebaseAuthContext';
import Navbar from './Navbar';
import SearchBar from './SearchBar';

const Homepage = () => {
  // const navigate = useNavigate();
  const user = useFirebaseAuth();
  console.log(user);
  return (
    <div className="flex flex-col">
      <Navbar />
      <SearchBar />
      {/* {user? } */}
    </div>
  );
};

export default Homepage;
