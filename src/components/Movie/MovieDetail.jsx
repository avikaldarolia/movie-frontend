/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Navbar from '../../components/Navbar';
import { IoMdArrowRoundBack } from 'react-icons/io';
// import SearchBar from '../../components/SearchBar';
import axios from 'axios';
import { useDisclosure } from '@chakra-ui/react';
import NewPlaylistModal from './NewPlaylistModal';
const MovieDetail = () => {
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // console.log(params.id);
  const [movie, setMovie] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getMovie = async () => {
      await axios
        .get(`http://www.omdbapi.com/?apikey=55d8034d&i=${params.id}`)
        .then((res) => setMovie(res.data));
    };
    getMovie();
  }, [params.id]);
  console.log(movie);
  return (
    <div className="w-full h-full">
      <Navbar />
      {/* <SearchBar /> */}
      <div className="flex items-center mt-5 ml-8">
        <IoMdArrowRoundBack
          onClick={() => navigate(-1)}
          className="w-10 h-10 hover:fill-black cursor-pointer"
          style={{ color: '#f9790e' }}
        />
        <p className="text-2xl ml-3">Search Results</p>
        <div className="ml-auto mr-10">
          <button
            onClick={onOpen}
            className="bg-[#f9790e] text-black hover:text-white px-4 py-2 rounded-lg"
          >
            New Playlist
          </button>
          <NewPlaylistModal isOpen={isOpen} onClose={onClose} movie={movie} />
          <button className="bg-[#f9790e] text-black hover:text-white px-4 py-2 rounded-lg ml-6">
            Add to playlist
          </button>
        </div>
      </div>
      <div className="flex mx-10 rounded-2xl mt-10 py-16 bg-gray-200 border border-[#f9790e]">
        <img src={movie?.Poster} className="h-96 ml-16" alt="" />
        <div className="px-5 w-full">
          <p className="text-6xl font-bold">
            {movie?.Title} {'   '}{' '}
            <span className="font-light text-xl">
              {movie?.Year}, Runtime: {movie?.Runtime}
            </span>{' '}
          </p>
          <p className="font-light">
            {' '}
            <b> Genre:</b> {movie?.Genre}
          </p>
          <div className="pt-3">
            <span className="text-xl font-medium ">Plot</span>
            <div className="w-full border border-[#f9790e] bg-white rounded-xl mt-3 px-2 py-2">
              "<p>{movie?.Plot}</p>"
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <div className="bg-white border border-[#f9790e] px-5 rounded-xl  text-xl font-medium py-2">
              <p>IMDB Rating : {movie?.imdbRating}</p>
            </div>
            <div className="bg-white border border-[#f9790e] px-5 rounded-xl text-xl font-medium py-2">
              <p>IMDB Votes : {movie?.imdbVotes}</p>
            </div>
            <div className="bg-white border border-[#f9790e] px-5 rounded-xl  text-xl font-medium py-2">
              <p>BoxOffice : {movie?.BoxOffice}</p>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <div className="bg-white border border-[#f9790e] px-5 rounded-xl  text-xl font-medium py-2">
              <p>Language : {movie?.Language}</p>
            </div>
            <div className="bg-white border border-[#f9790e] px-5 rounded-xl text-xl font-medium py-2">
              <p>Actors : {movie?.Actors}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
