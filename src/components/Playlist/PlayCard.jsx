import React from 'react';
import { Link } from 'react-router-dom';

const PlayCard = ({ name, mode, id }) => {
  return (
    <Link to={`${id}`}>
      <div className="bg-[#2F2D92] rounded-lg flex flex-col py-5 px-4 w-full cursor-pointer border border-[#f9790e]">
        <div className="flex justify-between items-center">
          <p className="text-gray-200 text-xl md:text-3xl">{name}</p>
        </div>
        <div className="bg-white flex rounded-xl py-1 md:py-2 mt-5 border border-[#f9790e]">
          <p className="px-1">Status: {mode}</p>
        </div>
      </div>
    </Link>
  );
};

export default PlayCard;
