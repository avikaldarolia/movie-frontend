import React from 'react';
import { Link } from 'react-router-dom';
import { useFirebaseAuth } from '../../context/FirebaseAuthContext';
// import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
// import { db } from '../../firebase-config';
const MovieCard = ({ name, poster, imdb, pid, indx, userUid }) => {
  // const navigate = useNavigate();
  const user = useFirebaseAuth();
  const handleDelete = async () => {
    // const playRef = doc(db, 'playlists', 'movies');
    // console.log(playRef, '$#');
    // await updateDoc(playRef, {
    //   movies:
    // });
    // navigate('/playlists');
    // return;
  };
  return (
    <div className="bg-gray-200 rounded-lg w-1/5 flex flex-col py-5 px-4 w-full cursor-pointer border border-[#f9790e]">
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
