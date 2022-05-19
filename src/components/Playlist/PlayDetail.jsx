import React from 'react';
import { useParams } from 'react-router';
import Navbar from '../Navbar';
import { samplePlaylists } from '../../util/samplePlaylists';
import MovieCard from './MovieCard';
const PlayDetail = () => {
  const params = useParams();
  // eslint-disable-next-line eqeqeq
  let playlist = samplePlaylists.find((ply) => params.id == ply.id);

  return (
    <div className="w-full">
      <Navbar />
      <p className="rounded-xl py-5 bg-gray-200 w-fit px-10 text-5xl ml-16 mt-16">
        Movies in: {playlist.name}{' '}
      </p>
      {playlist.movies.length < 1 ? (
        <div>No Movies added yet...</div>
      ) : (
        <div className="grid md:grid-cols-4 gap-6 mx-32 mt-16">
          {playlist.movies.map((movie, indx) => (
            <MovieCard
              key={indx}
              name={movie.name}
              id={movie.id}
              poster={movie.poster}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayDetail;
