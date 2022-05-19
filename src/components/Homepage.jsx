/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Navbar from './Navbar';
import SearchBar from './SearchBar';

const Homepage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');

    if (authToken) {
      navigate('/');
    }
    if (!authToken) {
      navigate('/login');
    }
  }, []);
  return (
    <div className="flex flex-col">
      <Navbar />
      <SearchBar />
      homepage
    </div>
  );
};

export default Homepage;
