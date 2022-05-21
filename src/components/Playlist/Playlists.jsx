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
import { useFirebaseAuth } from '../../context/FirebaseAuthContext';
import PlayCard from './PlayCard';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../firebase-config';
const Playlists = () => {
  const user = useFirebaseAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [val, setVal] = useState('1');
  const [name, setName] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rel, setRel] = useState(false);
  useEffect(() => {
    const func = async () => {
      await getDocs(collection(db, 'playlists'))
        .then((res) => {
          let list = res.docs
            .map((doc) => doc.data())
            .filter((li) => li.uid === user?.uid);
          setPlaylist(list);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    };
    func();
  }, [rel]);
  const handleSave = async (e) => {
    e.preventDefault();
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
      movies: [],
    });
    // adding pid (playlist Id)
    const playRef = doc(db, 'playlists', docRef.id);
    await updateDoc(playRef, {
      pid: docRef.id,
    });
    setRel(!rel);

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
                    mode={ply.mode}
                    pid={ply.pid}
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
