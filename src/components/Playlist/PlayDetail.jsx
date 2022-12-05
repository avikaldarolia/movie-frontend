/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Navbar from '../Navbar';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { ImLock, ImUnlocked } from 'react-icons/im';
import MovieCard from '../Movie/MovieCard';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { MdEdit } from 'react-icons/md';
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
import axios from 'axios';
import { URL } from '../../config/config'

const PlayDetail = () => {
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState();
  const user = JSON.parse(Cookies.get('user'));
  const [isLoading, setIsLoading] = useState(true);
  const [deleteText, setDeleteText] = useState('')
  // TODO: Also add paranoid true in modals later on
  const handleDelete = async (e) => {
    if (deleteText !== `${user.email}/${playlist.name}`) {
      toast.error("Text doesn't match")
      return;
    }
    try {
      await axios.delete(`${URL}/playlist`, { data: { id: parseInt(params.id) } })
      toast.success("Playlist Deleted")
      navigate('/playlists');
    } catch (err) {
      toast.error("Some Error Occured!")
      return;
    }
  };

  useEffect(() => {
    const getPlaylist = async () => {
      let response = await axios.get(`${URL}/playlist`, { params: { id: parseInt(params.id) } })
      setPlaylist(response.data.data.rows[0])
      console.log("RES", response.data.data);
      setIsLoading(false)
    }
    if (user) {
      getPlaylist()
    }
  }, [params.id])

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
        <>
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
                  {playlist?.isPrivate === true ? (
                    <ImLock className="" style={{ color: '#f9790e' }} />
                  ) : (
                    <ImUnlocked className="mr-1" style={{ color: '#f9790e' }} />
                  )}
                  <p>{playlist?.isPrivate ? "Private" : "Public"}</p>
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
                    <p className="pl-1" onClick={onOpen}>
                      Delete
                    </p>
                  </button>
                </div>
              </div>
            </div>
            {/* code for movies will come here */}
            {playlist === undefined || playlist?.length < 1 ? (
              <p className="ml-32 mt-16 text-3xl">
                Seems a bit empty here... <br /> Add some movies to see
                the changes.
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
                  className="text-white bg-black cursor-pointer px-3 py-2 rounded-xl"
                  onClick={handleDelete}
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
