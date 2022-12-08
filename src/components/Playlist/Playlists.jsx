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
import axios from 'axios';
import { URL } from "../../config/config";
const Playlists = () => {
  const jwt = Cookies.get('jwt')
  console.log(jwt);
  const user = JSON.parse(Cookies.get('user'))

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [val, setVal] = useState('1');
  const [name, setName] = useState('');
  const [playlist, setPlaylist] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        let playlists = await axios.get(`${URL}/playlist/userId/${user.id}`)
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
      const newPlaylist = await axios.post(`${URL}/playlist`, playlistData);
      if (!newPlaylist.data.data) {
        toast.error(newPlaylist.data.error)
        return;
      }
      setPlaylist([...playlist, newPlaylist.data.data])

    } catch (err) {
      toast.error('Something went wrong')
      return;
    }

    onClose();
  };

  return (
    <div className="w-full ">
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
          <div className="flex justify-between items-center mt-6">
            <p className="ml-16 text-5xl ">
              Your Playlists{' '}
              <span className="font-light text-xl">(Click for details)</span>{' '}
            </p>
            <button
              style={{ backgroundColor: '#f9790e' }}
              onClick={onOpen}
              className="flex items-center h-fit py-3 px-4 rounded-xl mr-24 hover:text-white"
            >
              Create a Playlist
            </button>
          </div>
          {playlist?.length > 0 ? (
            <div className="grid md:grid-cols-4 gap-4 mx-32 mt-16">
              {playlist &&
                playlist.map((ply, indx) => (
                  <PlayCard
                    key={indx}
                    name={ply.name}
                    mode={ply.isPrivate ? "Private" : "Public"}
                    id={ply.id}
                  />
                ))}
            </div>
          ) : (
            <p className="ml-16 text-4xl mt-3">
              You dont't have any playlists yet...
            </p>
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
        </>
      )}
    </div>
  );
};

export default Playlists;
