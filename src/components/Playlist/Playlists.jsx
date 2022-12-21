/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
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
  RadioGroup,
  Stack,
  Radio,
  Spinner,
} from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlayCard from './PlayCard';
import Cookies from 'js-cookie';
import { URL } from "../../config/config";
import makeAxiosRequest from '../../utils/utils';
import lonely from '../../assets/lonely.gif'

const Playlists = () => {
  const user = JSON.parse(Cookies.get('user'))

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [val, setVal] = useState('1');
  const [name, setName] = useState('');
  const [playlist, setPlaylist] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        let playlists = await makeAxiosRequest(`${URL}/playlist/userId/${user.id}`, "GET")
        setPlaylist(playlists.data.data)

      } catch (err) {
        toast.error('Something went wrong')
      }
      setIsLoading(false)
    }
    getPlaylists()
  }, [])

  const handleSave = async (e) => {
    e.preventDefault();
    if (name.length < 1) {
      toast.error("Please provide a name");
      return;
    }

    let playlistData = {
      name,
      userId: parseInt(user.id),
      isPrivate: val === '1' ? false : true
    }

    try {
      const newPlaylist = await makeAxiosRequest(`${URL}/playlist`, "POST", {}, playlistData)
      if (!newPlaylist.data.data) {
        toast.error(newPlaylist.data.error)
        return;
      }
      newPlaylist.data.data.Movies = []
      toast.success('Playlist Created')
      setPlaylist([...playlist, newPlaylist.data.data])

    } catch (err) {
      toast.error('Something went wrong')
      return;
    }

    onClose();
  };

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
        <div className='flex flex-col'>
          <div className="flex justify-between bg-gray-300 items-center py-6 px-10">
            <div className="flex flex-col">
              <p className="md:ml-16 text-xl md:text-5xl">
                Your Playlists...
              </p>
              <p className="font-light text-sm md:text-xl md:ml-16">(Click for details)</p>
            </div>
            <button
              style={{ backgroundColor: '#f9790e' }}
              onClick={onOpen}
              className="flex items-center py-1 px-2 md:py-3 md:px-4 rounded-lg md:rounded-xl md:mr-24 hover:text-white"
            >
              Create a Playlist
            </button>
          </div>
          {playlist?.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mx-10 md:mx-12 mt-10 md:mt-16">
              {playlist &&
                playlist.map((ply, indx) => (
                  <PlayCard
                    key={ply.id}
                    name={ply.name}
                    mode={ply.isPrivate ? "Private" : "Public"}
                    id={ply.id}
                    movies={ply.Movies.length}
                  />
                ))}
            </div>
          ) : (
            <div className="flex flex-col">
              <p className="w-4/5 mx-auto md:ml-16 text-xl py-10 md:text-4xl">
                You don't have any playlists yet...
              </p>
              <img className='md:mt-6 rounded rounded-xl object-fit w-4/5 md:w-fit h-fit bg-center mx-auto pointer-events-none' src={lonely} alt="empty" />
            </div>
          )}

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent className="flex my-auto">
              <ModalHeader className="mt-5">Create New Playlist</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  variant="outline"
                  outlineColor={'#f9790e'}
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <RadioGroup
                  value={val}
                  onChange={setVal}
                  className="mt-5 mx-auto"
                  defaultValue={true}
                >
                  <Stack spacing={5} direction="row">
                    <Radio size="lg" colorScheme="orange" value="1">
                      Public
                    </Radio>
                    <Radio size="lg" colorScheme="orange" value="2">
                      Private
                    </Radio>
                  </Stack>
                </RadioGroup>
              </ModalBody>

              <ModalFooter>
                <button
                  className="text-white bg-black cursor-pointer px-3 py-2 rounded-xl"
                  onClick={handleSave}
                >
                  Save
                </button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Playlists;
