import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import SearchBar from './SearchBar';
const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation()

  console.log(pathname);
  const handleLogout = () => {
    Cookies.remove('user')
    Cookies.remove('jwt')
    navigate('/login');
  };
  return (
    <div className="flex md:justify-between bg-black items-center py-3 md:py-5 px-2 md:px-12">
      <div className="flex items-center">
        <Link to="/">
          <p className="text-white cursor-pointer">Bot-Movies</p>
        </Link>
      </div>

      <div className={`hidden md:${pathname !== '/' && 'block'}`}>
        <SearchBar q={'t'} />
      </div>

      <div className="text-white cursor-pointer hover:text-[#f9790e]">
        <Link to="/playlists">My Playlists</Link>
      </div>

      <div className="">
        <FiLogOut
          onClick={handleLogout}
          className="h-6 w-6 text-white ml-auto cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
