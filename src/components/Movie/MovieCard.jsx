import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ name, id, poster, imdb }) => {
  return (
    // send imdb id probably
    <Link to={`/movie/${imdb}`}>
      <div className="bg-gray-200 rounded-lg w-1/5 flex flex-col py-5 px-4 w-full cursor-pointer border border-[#f9790e]">
        <img src={poster} className="h-80" alt="" />
        <p className="text-2xl mt-3">{name}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
