import {
  Modal,
  ModalBody,
  ModalCloseButton,
  Input,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useFirebaseAuth } from '../../context/FirebaseAuthContext';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
const NewPlaylistModal = ({ isOpen, onClose, movie }) => {
  const user = useFirebaseAuth();
  const [val, setVal] = useState('1');
  const [name, setName] = useState('');
  const handleSave = async (e) => {
    e.preventDefault();
    // console.log(name, val, movie);
    if (name.length < 1) {
      toast.error('No name entered');
      return;
    }
    let mode = 'public';
    if (val === '2') {
      mode = 'private';
    }

    const docRef = await addDoc(collection(db, 'playlists'), {
      uid: user.uid,
      name: name,
      mode: mode,
      movies: [movie],
    });
    const playRef = doc(db, 'playlists', docRef.id);
    await updateDoc(playRef, {
      pid: docRef.id,
    });
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ToastContainer />
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new Playlist</ModalHeader>
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
            className="bg-[#f9790e] px-3 py-2 rounded-xl hover:text-white"
            // onClick={onClose}
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-black text-white px-3 py-2 rounded-xl ml-4"
            onClick={onClose}
          >
            Close
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewPlaylistModal;
