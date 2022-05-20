import React, { useState } from 'react';
import { useFirebaseAuth } from '../../context/FirebaseAuthContext';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, toast } from 'react-toastify';

const handleSave = (e) => {
  e.preventDefault();
  console.log('Test');
};

const ExistingPlaylist = ({ onClose }) => {
  //   const user = useFirebaseAuth();
  //   const [val, setVal] = useState('1');
  //   const [name, setName] = useState('');
  return (
    <div className="">
      <p>Your Playlists</p>
      <button
        className="bg-[#f9790e] px-3 py-2 rounded-xl hover:text-white mt-4"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};
export default ExistingPlaylist;
