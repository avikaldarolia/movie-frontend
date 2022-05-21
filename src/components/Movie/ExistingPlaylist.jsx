/* eslint-disable react-hooks/exhaustive-deps */
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFirebaseAuth } from '../../context/FirebaseAuthContext';
import { db } from '../../firebase-config';

const ExistingPlaylist = ({ onClose, movie, tabIndex }) => {
  const user = useFirebaseAuth();
  const [selected, setSelected] = useState();
  const [playlist, setPlaylist] = useState();
  const handleSave = async (e) => {
    e.preventDefault();
    let selectedP = playlist?.find((p) => p.pid === selected);
    let oldMovies = selectedP.movies;
    let check = false;
    let b = movie.imdbID;
    for (let i = 0; i < oldMovies?.length; i++) {
      if (strcmp(oldMovies[i].imdbID, b)) {
        check = true;
        break;
      }
    }
    function strcmp(a) {
      b = b.toString();
      a = a.toString();
      const n = b.length;
      if (a.length === 0 || b.length === 0 || a.length !== b.length) {
        return false;
      }
      for (let i = 0; i < n; i++) {
        if (a.charAt(i) !== b.charAt(i)) {
          return false;
        }
      }
      return true;
    }
    if (check) {
      toast.error('Movie already present inside this playlist');
      return;
    }
    oldMovies.push(movie);
    const playRef = doc(db, 'playlists', selectedP?.pid);
    await updateDoc(playRef, {
      movies: oldMovies,
    });
    onClose();
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

    func();
  }, []);

  return (
    <div className="flex flex-col">
      <ToastContainer />
      <p>Your Playlists</p>
      <select
        className="mt-4 py-2 w-fit px-2"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="Select a playlist">Select a playlist</option>
        {playlist &&
          playlist?.map((play, indx) => (
            <option key={indx} value={play?.pid}>
              {play?.name}
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
