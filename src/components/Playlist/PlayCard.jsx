import React from 'react';
import { Link } from 'react-router-dom';

const PlayCard = ({ id, name, mode }) => {
  return (
    <Link to={`${id}`}>
      <div className="bg-gray-200 rounded-lg w-1/5 flex flex-col py-5 px-4 w-full cursor-pointer">
        <p className="text-2xl ">{name}</p>
        <div className="bg-white flex rounded-xl py-2 mt-5 border border-[#f9790e]">
          <p className="ml-4">Status: {mode}</p>
        </div>
      </div>
    </Link>
  );
};

export default PlayCard;
