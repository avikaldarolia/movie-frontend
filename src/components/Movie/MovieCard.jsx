import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URL } from '../../config/config';
import makeAxiosRequest from '../../utils/utils';

const MovieCard = ({ name, poster, imdb, mapping, setReloadFlag, reloadFlag }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    try {
      let deletedMovie = await makeAxiosRequest(`${URL}/playlist_movie`, "DELETE", {}, { id: parseInt(mapping.id) })
      if (deletedMovie.data.data !== 1) {
        toast.error('Failed!')
      }
    } catch (error) {
      toast.error('Something went wrong!')
    }
    setReloadFlag(!reloadFlag)
    onClose()
  };
  return (
    <div className="bg-black rounded-lg flex flex-col py-3 px-2 md:py-5 md:px-4 w-full cursor-pointer border border-[#f9790e]">
      <ToastContainer />
      <Link to={`/movie/${imdb}`}>
        <div className="">
          <img src={poster} className="h-56 sm:h-64 md:h-80 w-11/12 mx-auto" alt="" />
          <p className="text-lg mx-auto w-11/12 text-white md:text-2xl mt-3">{name}</p>
        </div>
      </Link>
      <button
        onClick={onOpen}
        className="bg-red-500 text-white px-4 py-2 rounded-xl w-full mx-auto hover:text-black mt-3"
      >
        Delete
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="flex my-auto">
          <ModalHeader className="mt-5">Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete <span className='font-bold text-red-500 underline'>{name}</span> from your playlist?
          </ModalBody>

          <ModalFooter className=''>
            <button
              className="text-white bg-red-500 cursor-pointer px-3 py-2 rounded-xl hover:text-black mr-auto"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="text-white bg-black cursor-pointer px-3 py-2 rounded-xl ml-auto"
              onClick={onClose}
            >
              Close
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MovieCard;
