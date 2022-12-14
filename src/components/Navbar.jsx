import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FaUserNinja } from "react-icons/fa"
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import SearchBar from './SearchBar/SearchMovieBar';
const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation()
  const [dropdownState, setDropdownState] = useState(false);
  console.log(pathname);
  const handleLogout = () => {
    Cookies.remove('user')
    Cookies.remove('jwt')
    navigate('/login');
  };
  let user = JSON.parse(Cookies.get('user'))
  return (
    <div className="flex md:justify-between bg-black items-center py-1.5 md:py-5 px-2 md:px-12">
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

      <div className="relative">
        <FaUserNinja onClick={() => setDropdownState(!dropdownState)} className='text-white rounded-full h-8 w-8 outline outline-[#f9790e] py-0.5' />
        {dropdownState &&
          <div className="flex flex-col justify-center items-center absolute m-auto left-0 right-0 z-20">
            <div className='triangle-up mx-auto mt-0.5' />
            <div className='flex items-center divide-y divide-white-400 justify-center py-3 flex-col bg-[#f9790e] w-fit px-6 rounded rounded-lg'>
              <p onClick={() => navigate('/user/profile', { state: { id: parseInt(user.id), username: user.username } })} className="cursor-pointer text-black hover:text-white hover:opacity-70">Profile</p>
              <Link to="/friends">
                <p className="cursor-pointer text-black hover:text-white hover:opacity-70">Friends</p>
              </Link>
              <Link to="/playlists">
                <p className="cursor-pointer text-black hover:text-white hover:opacity-70">Playlists</p>
              </Link>
              <p onClick={handleLogout} className="cursor-pointer text-black hover:text-white hover:opacity-70">SignOut</p>
            </div>
          </div>
        }
      </div >
    </div >
  );
};

export default Navbar;
