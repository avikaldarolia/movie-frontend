import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ name, id, poster }) => {
  return (
    <Link to={`${id}`}>
      <div className="bg-gray-200 rounded-lg w-1/5 flex flex-col py-5 px-4 w-full cursor-pointer">
        <img src={poster} className="h-80" alt="" />
        <p className="text-2xl ">{name}</p>
        <div className="bg-white flex rounded-xl py-2 mt-5 border border-[#f9790e]"></div>
      </div>
    </Link>
  );
};

export default MovieCard;
