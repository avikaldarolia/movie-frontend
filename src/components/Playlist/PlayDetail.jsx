import React from 'react';
import { useParams } from 'react-router';
import Navbar from '../Navbar';
import { samplePlaylists } from '../../util/samplePlaylists';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { ImLock } from 'react-icons/im';
import { ImUnlocked } from 'react-icons/im';
import MovieCard from '../Movie/MovieCard';
import { Link } from 'react-router-dom';
const PlayDetail = () => {
  const params = useParams();
  // eslint-disable-next-line eqeqeq
  let playlist = samplePlaylists.find((ply) => params.id == ply.id);
  // console.log(playlist.movies);
  let mode = playlist.mode;
  return (
    <div className="w-full">
      <Navbar />
      <div className="flex items-center ml-12 mt-16">
        <Link to="/playlists">
          <IoMdArrowRoundBack
            className="w-10 h-10 hover:fill-black cursor-pointer"
            style={{ color: '#f9790e' }}
          />
        </Link>
        <div className="flex items-center rounded-xl py-5 bg-gray-200 ml-4 w-fit px-10 ">
          <p className="text-5xl ">Movies in: {playlist.name} </p>
          <div className="ml-5 mt-1.5 flex items-center bg-white rounded-xl py-1 px-2">
            {mode === 'Private' ? (
              <ImLock className="" style={{ color: '#f9790e' }} />
            ) : (
              <ImUnlocked className="mr-1" style={{ color: '#f9790e' }} />
            )}
            <p>{mode}</p>
          </div>
        </div>
      </div>
      {playlist.movies.length === 0 ? (
        <p className="ml-32 mt-16 text-3xl">
          Seems a bit empty here... <br /> Add some movies to see the changes.
        </p>
      ) : (
        <div className="grid md:grid-cols-4 gap-6 mx-32 mt-16">
          {playlist.movies.map((movie, indx) => (
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
