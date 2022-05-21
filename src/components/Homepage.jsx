/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';

const Homepage = () => {
  
  return (
    <div className="flex flex-col">
      <Navbar />
      <p className="text-5xl mx-auto mt-20 mb-3">Search By Movie Title</p>
      <SearchBar q={'t'} />
      <p className="text-5xl mx-auto mt-20 mb-3">Search By Movie's IMDB ID</p>
      <SearchBar q={'i'} />
    </div>
  );
};

export default Homepage;
