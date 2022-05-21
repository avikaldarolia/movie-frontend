import React from 'react';
import { Link } from 'react-router-dom';

const PlayCard = ({ name, mode, pid }) => {
  return (
    <Link to={`${pid}`}>
      <div className="bg-gray-200 rounded-lg flex flex-col py-5 px-4 w-full cursor-pointer">
        <div className="flex justify-between items-center">
          <p className="text-2xl">{name}</p>
        </div>
        <div className="bg-white flex rounded-xl py-2 mt-5 border border-[#f9790e]">
          <p className="ml-4">Status: {mode}</p>
        </div>
      </div>
    </Link>
  );
};

export default PlayCard;
