import React from 'react';
import { Link } from 'react-router-dom';
import { useFirebaseAuth } from '../../context/FirebaseAuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { useNavigate } from 'react-router';

const MovieCard = ({ name, poster, imdb, pid, indx, userUid, playlist }) => {
  const navigate = useNavigate();
  const user = useFirebaseAuth();
  const handleDelete = async () => {
    let movies = playlist.movies;
    // console.log(movies);
    let newMovies = movies.filter((mv) => mv.imdbID !== imdb);
    // console.log(newMovies);
    const playRef = doc(db, 'playlists', pid);
    await updateDoc(playRef, {
      movies: newMovies,
    });

    navigate('/playlists');
  };
  return (
    <div className="bg-gray-200 rounded-lg flex flex-col py-5 px-4 w-full cursor-pointer border border-[#f9790e]">
      <Link to={`/movie/${imdb}`}>
        <div className="">
          <img src={poster} className="h-80 mx-auto" alt="" />
          <p className="text-2xl mt-3">{name}</p>
        </div>
      </Link>
      {user?.uid === userUid && (
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-xl w-full mx-auto hover:text-black mt-3"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default MovieCard;
