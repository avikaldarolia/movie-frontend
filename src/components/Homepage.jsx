/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
// import { useNavigate } from 'react-router';
import { useFirebaseAuth } from '../context/FirebaseAuthContext';
import Navbar from './Navbar';
import SearchBar from './SearchBar';

const Homepage = () => {
  // const navigate = useNavigate();
  const user = useFirebaseAuth();
  // console.log(user);
  return (
    <div className="flex flex-col">
      <Navbar />
      <p className="text-5xl mx-auto mt-20 mb-3">Search By Movie Title</p>
      <SearchBar q={'t'} />
      <p className="text-5xl mx-auto mt-20 mb-3">Search By Movie's IMDB ID</p>
      <SearchBar q={'id'} />
    </div>
  );
};

export default Homepage;
