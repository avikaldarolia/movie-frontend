/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Navbar from '../Navbar';
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
// import { useFirebaseAuth } from '../../context/FirebaseAuthContext';
import { Spinner } from '@chakra-ui/react';
import Cookies from 'js-cookie';
const PlayDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState();
  const user = Cookies.get('user');
  // const user = useFirebaseAuth();
  const [isLoading, setIsLoading] = useState(true);
  const handleDelete = async (e) => {
    // TODO: delete a playlist. Also add paranoid true in modals later on
    // const playRef = doc(db, 'playlists', playlist?.pid);
    // await deleteDoc(playRef);
    navigate('/playlists');
  };
  // TODO: fix this. If playlist exists then fetch by playlist id and userId
  // useEffect(() => {
  //   const getPlay = async () => {
  //     await getDoc(doc(db, 'playlists', params.id))
  //       .then((play) => {
  //         if (play.exists()) {
  //           let playlistData = play.data();
  //           if (
  //             playlistData?.uid !== user?.uid &&
  //             playlistData.mode === 'private'
  //           ) {
  //             toast.error('This is a private playlist, Redirecting!');
  //             setTimeout(() => {
  //               navigate('/playlists');
  //             }, 6000);
  //             return;
  //           }
  //           setPlaylist(play.data());
  //           setIsLoading(false);
  //         } else {
  //           toast.error("Playlist doesn't exist,\n Redirecting");
  //           setTimeout(() => {
  //             navigate('/playlists');
  //           }, 6000);
  //         }
  //       })
  //       .catch(() => {
  //         toast.error('Some Error Occured,\n Redirecting');
  //         setTimeout(() => {
  //           navigate('/playlists');
  //         }, 6000);
  //       });
  //   };
  //   if (user) {
  //     getPlay();
  //   }
  // }, [params.id, user]);

  return (
    <div className="w-full">
      <ToastContainer />
      <Navbar />
      {isLoading ? (
        <div className="m-auto h-screen">
          <Spinner
            thickness="4px"
            position="relative"
            speed="0.65s"
            emptyColor="gray.200"
            color="#f9790e"
            size="xl"
            marginLeft={'45vw'}
            marginTop={'40vh'}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col">
          <div className="flex items-center ml-12 mt-8">
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
              {user?.uid === playlist?.uid && (
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
              )}
            </div>
          </div>
          {playlist?.movies === undefined || playlist?.movies?.length < 1 ? (
            <p className="ml-32 mt-16 text-3xl">
              Seems a bit empty here... <br /> Add some movies to see
              thechanges.
            </p>
          ) : (
            <div className="grid md:grid-cols-4 gap-6 mx-32 mt-8">
              {playlist?.movies?.map((movie, indx) => (
                <MovieCard
                  key={indx}
                  name={movie.Title}
                  poster={movie.Poster}
                  imdb={movie.imdbID}
                  pid={params.id}
                  userUid={playlist?.uid}
                  playlist={playlist}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayDetail;
