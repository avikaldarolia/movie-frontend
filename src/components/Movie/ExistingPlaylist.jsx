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
  // const [submit, setSubmit] = useState(false);
  // console.log(tabIndex);
  // useEffect(() => {
  //   const func = async () => {};
  // }, [submit]);

  const handleSave = async (e) => {
    e.preventDefault();
    let selectedP = playlist?.find((p) => p.pid === selected);
    console.log(selectedP, 'selected');
    let oldMovies = selectedP.movies;
    console.log(movie.imdbID, 'Movie IMDB');
    // let check = oldMovies?.find((mv) => mv.imdbId === movie.imdbId);
    // function strcmp(a) {
    //   let b = movie.imdbID;
    //   b = b.toString();
    //   a = a.toString();
    //   for (
    //     var i = 0, n = Math.max(a.length, b.length);
    //     i < n && a.charAt(i) === b.charAt(i);
    //     ++i
    //   );
    //   if (i === n) return 0;
    //   return a.charAt(i) > b.charAt(i) ? -1 : 1;
    // }
    // let check = oldMovies?.find(strcmp);
    // let check = oldMovies?.find((m) => toString(movie.imdbID).equals(m.imdbID));
    // console.log(check, 'CHECK');
    // if (check !== undefined) {
    //   toast.error('Movie already present inside this playlist');
    //   return;
    // }
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
            //   <div className="flex flex-col">{play.name}</div>
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
