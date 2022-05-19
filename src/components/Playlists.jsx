import React, { useState } from 'react';
import Navbar from './Navbar';
import { GrAddCircle } from 'react-icons/gr';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  HStack,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Playlists = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [val, setVal] = useState('1');
  const [name, setName] = useState('');
  const [playlist, setPlaylist] = useState([{ name: '', mode: '' }]);
  const handleSave = (e) => {
    console.log(val, name);
    if (name.length < 1) {
      toast.error('No name entered');
      return;
    }
    let mode = 'public';
    if (val == '2') {
      mode = 'private';
    }
    let elem = {
      name: name,
      mode: mode,
    };
    let play = [...playlist, elem];
    setPlaylist(play);
    console.log(playlist);
  };

  return (
    <div className="w-full ">
      <ToastContainer />
      <Navbar />
      <div className="flex justify-between items-center">
        <p className="ml-16 text-5xl mt-6">Your Playlists </p>
        <button
          style={{ backgroundColor: '#f9790e' }}
          onClick={onOpen}
          className="flex items-center h-fit py-3 px-4 rounded-xl mr-24 hover:text-white"
        >
          Create a Playlist
        </button>
      </div>
      <p className="ml-16 text-4xl mt-3">
        You dont't have any playlists yet...
      </p>
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
              defaultValue="1"
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
              //   onClick={onClose}
              //   disabled={val === '' ? 'true' : 'false'}
              onClick={handleSave}
            >
              Save
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Playlists;
