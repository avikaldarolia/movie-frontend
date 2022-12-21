/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Navbar from '../../components/Navbar';
import { IoMdArrowRoundBack } from 'react-icons/io';
// import SearchBar from '../../components/SearchBar';
import axios from 'axios';
import { Spinner, useDisclosure } from '@chakra-ui/react';
import PlayModal from './PlayModal';

const MovieDetail = () => {
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [movie, setMovie] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getMovie = async () => {
      await axios
        .get(`//www.omdbapi.com/?apikey=55d8034d&i=${params.id}`)
        .then((res) => setMovie(res.data));
      setIsLoading(false)
    };
    getMovie();
  }, [params.id]);
  return (
    <div className="w-full h-full">
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
        <>
          <div className="flex items-center mt-5 mx-auto md:ml-8">
            <IoMdArrowRoundBack
              onClick={() => navigate(-1)}
              className="w-6 md:w-10 h-6 md:h-10 ml-2 hover:fill-black cursor-pointer"
              style={{ color: '#f9790e' }}
            />
            <p className="text-lg md:text-2xl ml-3">Search Results</p>
            <div className="ml-auto mr-2 md:mr-10">
              <button
                onClick={onOpen}
                className="bg-[#f9790e] text-black hover:text-white px-1 md:px-4 py-1 md:py-2 rounded-lg"
              >
                Add to Playlist
              </button>

              <PlayModal isOpen={isOpen} onClose={onClose} movie={movie} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-11/12 mx-auto md:mx-10 rounded-lg md:rounded-2xl mt-4 md:mt-10 py-4 md:py-16 bg-black border border-[#f9790e]">
            <img src={movie?.Poster} className="h-64 sm:h-64 w-11/12 md:w-fit mx-auto md:mx-none md:h-96 md:ml-16" alt="" />
            <div className="md:px-5 w-11/12 mx-auto">
              <p className="text-2xl text-white md:text-6xl font-bold">
                {movie?.Title}
                <span className="font-light text-white text-base md:text-xl ml-1">
                  {movie?.Year}, Runtime: {movie?.Runtime}
                </span>
              </p>
              <p className="font-light text-white">
                <b> Genre:</b> {movie?.Genre}
              </p>
              <div className="pt-3">
                <span className="text-xl font-medium text-white">Plot</span>
                <div className="w-full border border-[#f9790e] bg-white rounded-xl mt-3 px-2 py-2">
                  "<p>{movie?.Plot}</p>"
                </div>
              </div>
              <div className="flex flex-wrap md:flex-row gap-2 md:gap-0 md:justify-between mt-5">
                <div className="bg-white border border-[#f9790e] px-2 md:px-5 rounded-xl md:text-xl font-medium py-2">
                  <p className='text-sm'>IMDB Rating : {movie?.imdbRating}</p>
                </div>
                <div className="bg-white border border-[#f9790e] px-2 md:px-5 rounded-xl md:ext-xl font-medium py-2">
                  <p className='text-sm'>IMDB Votes : {movie?.imdbVotes}</p>
                </div>
                <div className="bg-white border border-[#f9790e] px-2 md:px-5 rounded-xl md:text-xl font-medium py-2">
                  <p className='text-sm'>BoxOffice : {movie?.BoxOffice}</p>
                </div>
              </div>
              <div className="flex flex-wrap md:flex-row gap-2 md:gap-0 md:justify-between mt-5">
                <div className="bg-white border border-[#f9790e] px-2 md:px-5 rounded-xl md:text-xl font-medium py-2">
                  <p className='text-sm'>Language : {movie?.Language}</p>
                </div>
                <div className="bg-white border border-[#f9790e] px-2 md:px-5 rounded-xl md:ext-xl font-medium py-2">
                  <p className='text-sm'>Actors : {movie?.Actors}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
