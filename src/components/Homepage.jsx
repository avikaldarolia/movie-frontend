import React from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';

const Homepage = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <SearchBar />
    </div>
  );
};

export default Homepage;
