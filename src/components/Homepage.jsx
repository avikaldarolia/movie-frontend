/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar/SearchMovieBar';
import one from '../assets/one.jpeg'
const Homepage = () => {

  return (
    <div className="flex flex-col w-full h-screen bg-[#F4F4F4]">
      <Navbar />
      <div className='flex flex-col bg' style={{ backgroundImage: `url(${one})` }}>
        <p className="text-2xl md:text-6xl mx-auto mt-16 mb-12">Search any Movie/Show Title</p>
        <SearchBar q={'t'} />
        {/* <p className="text-2xl md:text-5xl mx-auto mt-20 mb-3">Search By Movie's IMDB ID</p>
      <SearchBar q={'i'} /> */}
      </div>

    </div >
  );
};

export default Homepage;
