import React from 'react';
import { Link } from 'react-router-dom';

const PlayCard = ({ name, mode, id, movies }) => {
  return (
    <Link to={`${id}`}>
      <div className="bg-black rounded-lg flex flex-col py-5 px-4 w-4/5 cursor-pointer border border-[#f9790e] hover:opacity-80">
        <div className="flex justify-between items-center">
          <p className="text-gray-200 text-xl md:text-4xl">{name}</p>
        </div>
        {movies > 0 ? <p className="px-1 py-2 text-gray-200">...has <span className='text-[#f9790e]'>{movies}</span> item inside.</p> : <p className="px-1 py-2 text-[#f9790e]">Empty :(</p>}

        <p className="px-1 pt-1 text-gray-200">Status: <span className='text-[#f9790e]'>{mode}</span> </p>
      </div>
    </Link>
  );
};

export default PlayCard;
