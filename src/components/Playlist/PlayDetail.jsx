/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Navbar from '../Navbar';
// import { samplePlaylists } from '../../util/samplePlaylists';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { ImLock } from 'react-icons/im';
import { ImUnlocked } from 'react-icons/im';
import MovieCard from '../Movie/MovieCard';
import { Link } from 'react-router-dom';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import { MdEdit } from 'react-icons/md';
import 'react-toastify/dist/ReactToastify.css';
import { AiTwotoneDelete } from 'react-icons/ai';
const PlayDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState();
  const handleDelete = async (e) => {
    const playRef = doc(db, 'playlists', playlist?.pid);
    await deleteDoc(playRef);
    navigate('/playlists');
    return;
  };
  useEffect(() => {
    const getPlay = async () => {
      const play = await getDoc(doc(db, 'playlists', params.id));
      if (play.exists()) {
        setPlaylist(play.data());
      } else {
        console.log("Playlist doesn't exist");
        toast.error("Playlist doesn't exist");
      }
    };
    getPlay();
  }, [params.id]);
  // console.log(playlist);
  return (
    <div className="w-full">
      <ToastContainer />
      <Navbar />
      <div className="flex items-center ml-12 mt-16">
        <Link to="/playlists">
          <IoMdArrowRoundBack
            className="w-10 h-10 hover:fill-black cursor-pointer"
            style={{ color: '#f9790e' }}
          />
        </Link>
        <div className="flex items-center rounded-xl py-5 bg-gray-200 ml-4 w-fit px-10 ">
          <p className="text-5xl ">Movies in: {playlist?.name}</p>
          <div className="ml-5 mt-1.5 flex items-center bg-white rounded-xl py-1 px-2">
            {playlist?.mode === 'private' ? (
              <ImLock className="" style={{ color: '#f9790e' }} />
            ) : (
              <ImUnlocked className="mr-1" style={{ color: '#f9790e' }} />
            )}
            <p>{playlist?.mode}</p>
          </div>
          <div className="flex items-center ml-32 bg-white rounded-xl py-2 px-3">
            <button
              onClick={() => navigate(`/playlists/edit/${params.id}`)}
              className="flex items-center px-3 bg-[#f9790e] py-2 rounded-xl hover:bg-orange-600"
            >
              <MdEdit style={{ color: 'black' }} />
              <p className="pl-1">Edit</p>
            </button>
            <button className="ml-4 flex items-center px-3 bg-[#f9790e] py-2 rounded-xl hover:bg-orange-600">
              <AiTwotoneDelete style={{ color: 'black' }} />
              <p className="pl-1" onClick={handleDelete}>
                Delete
              </p>
            </button>
          </div>
        </div>
      </div>
      {playlist?.movie === undefined || playlist?.movies.length === 0 ? (
        <p className="ml-32 mt-16 text-3xl">
          Seems a bit empty here... <br /> Add some movies to see the changes.
        </p>
      ) : (
        <div className="grid md:grid-cols-4 gap-6 mx-32 mt-16">
          {playlist?.movies.map((movie, indx) => (
            <MovieCard
              key={indx}
              name={movie.name}
              id={movie.id}
              poster={movie.poster}
              imdb={movie.imdbId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayDetail;

{
}
{
  /* */
}
