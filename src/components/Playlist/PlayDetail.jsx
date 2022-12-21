/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Navbar from '../Navbar';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { ImLock, ImUnlocked } from 'react-icons/im';
import MovieCard from '../Movie/MovieCard';
import { Link } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiTwotoneDelete } from 'react-icons/ai';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Spinner,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { URL } from '../../config/config'
import makeAxiosRequest from '../../utils/utils';
import nomovie from '../../assets/nomovie.gif'
const PlayDetail = () => {
  const user = JSON.parse(Cookies.get('user'));
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [deleteText, setDeleteText] = useState('')
  const [reloadFlag, setReloadFlag] = useState(false)

  // TODO: Also add paranoid true in modals later on
  const handleDelete = async (e) => {
    e.preventDefault()
    if (deleteText !== `${user.email}/${playlist.name}`) {
      toast.error("Text doesn't match")
      return;
    }
    try {
      await makeAxiosRequest(`${URL}/playlist`, "DELETE", {}, { id: parseInt(params.id) })
      toast.success("Playlist Deleted")
      navigate('/playlists');
    } catch (err) {
      toast.error("Some Error Occured!")
      return;
    }
  };

  useEffect(() => {
    const getPlaylistWithMovies = async () => {
      try {
        let playlistWithMovies = await makeAxiosRequest(`${URL}/playlist/${params.id}`, "GET")
        setPlaylist(playlistWithMovies.data.data)
        console.log(playlistWithMovies.data.data);
      } catch (err) {
        toast.error('Something Went Wrong!')
      }
      setIsLoading(false)
    }
    getPlaylistWithMovies()

  }, [params.id, reloadFlag])

  return (
    <div className="w-full bg-[#F4F4F4] h-screen">
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
        <>
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col bg-gray-300 md:flex-row items-center py-2 md:py-5">
              <div className="flex justify-between items-center w-11/12 md:w-4/5 md:mx-10">
                <Link to="/playlists">
                  <IoMdArrowRoundBack
                    className="w-6 h-6 md:w-10 md:h-10 hover:fill-black cursor-pointer ml-4"
                    style={{ color: '#f9790e' }}
                  />
                </Link>
                <p className="text-2xl md:text-5xl">{playlist?.name}</p>
                <div className="flex items-center bg-black text-white rounded-lg md:rounded-xl py-1 px-2 md:px-3">
                  {playlist?.isPrivate === true ? (
                    <ImLock className="w-3 h-3" style={{ color: '#f9790e' }} />
                  ) : (
                    <ImUnlocked className="w-3 h-3 mr-1" style={{ color: '#f9790e' }} />
                  )}
                  <p className='text-xs md:text-xl'>{playlist?.isPrivate ? "Private" : "Public"}</p>
                </div>
              </div>

              <div className="flex w-3/5 mx-4 md:w-2/5 justify-around items-center py-2 px-3">
                <button
                  onClick={() => navigate(`/playlists/edit/${params.id}`)}
                  className="flex sm:text-sm items-center py-1 px-2 md:px-3 bg-black text-white rounded-lg md:rounded-xl"
                >
                  <MdEdit className='w-3 h-3' style={{ color: '#f9790e' }} />
                  <p className="text-xs md:text-xl pl-1">Edit</p>
                </button>
                <button className="flex sm:text-sm items-center py-1 px-2 md:px-3 bg-black text-white rounded-lg md:rounded-xl hover:text-red-500">
                  <AiTwotoneDelete className='w-3 h-3' style={{ color: '#f9790e' }} />
                  <p className="text-xs md:text-xl pl-1" onClick={onOpen}>
                    Delete
                  </p>
                </button>
              </div>
            </div>
            {playlist.Movies === undefined || playlist?.Movies.length < 1 ? (
              <div className="flex flex-col">
                <p className="mx-auto my-6 md:mt-12 md:text-3xl">
                  Seems a bit empty here... <br /> Add some movies to see
                  the changes.
                </p>
                <img className='md:mt-16 rounded rounded-xl object-fit w-4/5 md:w-fit bg-center mx-auto pointer-events-none' src={nomovie} alt="" />
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-10 md:mx-28 mt-4 md:mt-8">
                {playlist?.Movies?.map((movie, indx) => (
                  <MovieCard
                    key={indx}
                    name={movie.title}
                    poster={movie.poster}
                    imdb={movie.imdbID}
                    mapping={movie.Playlist_Movie}
                    setReloadFlag={setReloadFlag}
                    reloadFlag={reloadFlag}
                  />
                ))}
              </div>
            )}
          </div>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent className="flex my-auto">
              <ModalHeader className="">Delete Playlist</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <p className='mt-2 mb-10'>Are you sure you want to delete this playlist? <br />
                  Please type <b> {user.email}/{playlist.name}</b> to confirm.</p>
                <Input
                  variant="outline"
                  outlineColor={'#f9790e'}
                  placeholder="..."
                  value={deleteText}
                  onChange={(e) => setDeleteText(e.target.value)}
                />
              </ModalBody>

              <ModalFooter>
                <button
                  className={`text-white bg-red-500 cursor-pointer px-3 py-2 rounded-xl ${(deleteText !== (user.email + '/' + playlist.name).toString()) ? "opacity-70 cursor-not-allowed" : ""}`}
                  onClick={handleDelete}
                  disabled={(deleteText !== `${user.email}/${playlist.name}`) ? true : false}
                >
                  Delete
                </button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
};

export default PlayDetail;
