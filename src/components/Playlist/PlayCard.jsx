import React from 'react';
import { Link } from 'react-router-dom';
import { AiTwotoneDelete } from 'react-icons/ai';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { useNavigate } from 'react-router';
const PlayCard = ({ id, name, mode, pid }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    const playRef = doc(db, 'playlists', pid);
    await deleteDoc(playRef);
    // navigate()
    return;
  };
  return (
    <div className="bg-gray-200 rounded-lg w-1/5 flex flex-col py-5 px-4 w-full cursor-pointer">
      <div className="flex justify-between items-center">
        <p className="text-2xl">{name}</p>
        <AiTwotoneDelete
          onClick={handleDelete}
          className="hover:fill-black cursor-pointer w-6 h-6"
          style={{ color: '#f9790e' }}
        />
      </div>
      <Link to={`${id}`}>
        <div className="bg-white flex rounded-xl py-2 mt-5 border border-[#f9790e]">
          <p className="ml-4">Status: {mode}</p>
        </div>
      </Link>
    </div>
  );
};

export default PlayCard;
