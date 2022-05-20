import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useFirebaseAuth } from '../../context/FirebaseAuthContext';
import { db } from '../../firebase-config';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, toast } from 'react-toastify';

const ExistingPlaylist = ({ onClose, movie, tabIndex }) => {
  const user = useFirebaseAuth();
  const [selected, setSelected] = useState();
  const [playlist, setPlaylist] = useState();
  console.log(tabIndex);
  const handleSave = (e) => {
    e.preventDefault();
    console.log('Test');
    // console.log(selected, movie);
    console.log(playlist?.mode, 'moviess');
    // let movies = playlist?.movies;
    // let fm = [...movies, movie];
    // console.log(fm);
  };
  useEffect(() => {
    const func = async () => {
      await getDocs(collection(db, 'playlists'))
        .then((res) => {
          let list = res.docs
            .map((doc) => doc.data())
            .filter((li) => li.uid === user?.uid);
          setPlaylist(list);
        })
        .catch((err) => console.log(err));
    };
    if (tabIndex === 1) {
      console.log('tet');
      func();
    }
  }, []);
  console.log(playlist);
  return (
    <div className="flex flex-col">
      <p>Your Playlists</p>
      <select
        className="mt-4 py-2 w-fit px-2"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="Select a playlist">Select a playlist</option>
        {playlist &&
          playlist?.map((play, indx) => (
            //   <div className="flex flex-col">{play.name}</div>
            <option key={indx} value={play.name}>
              {play.name}
            </option>
          ))}
      </select>
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
