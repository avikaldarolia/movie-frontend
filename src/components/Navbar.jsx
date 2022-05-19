import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/login');
  };
  return (
    <div className="flex bg-black items-center">
      <p className="text-white py-5">Navbar</p>
      <p className="text-white py-5 mx-auto cursor-pointer">
        <Link to="/playlists">My Playlists</Link>
      </p>
      <FiLogOut
        onClick={handleLogout}
        className="h-6 w-6 text-white ml-auto mr-12 cursor-pointer"
      />
    </div>
  );
};

export default Navbar;
