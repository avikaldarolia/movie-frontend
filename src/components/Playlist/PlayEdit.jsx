import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { db } from '../../firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar';
import { IoMdArrowRoundBack } from 'react-icons/io';

const PlayEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  //   const loc = useLocation();
  //   console.log('LOC', loc);
  const [playlist, setPlaylist] = useState();
  const [name, setName] = useState(playlist?.name);
  const [val, setVal] = useState('1');
  useEffect(() => {
    const getPlay = async () => {
      const play = await getDoc(doc(db, 'playlists', params.id));
      if (play.exists()) {
        setPlaylist(play.data());
      } else {
        console.log("Playlist doesn't exist");
      }
    };
    getPlay();
  }, [params.id]);
  console.log(playlist);
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

    const playRef = doc(db, 'playlists', params.id);
    await updateDoc(playRef, {
      name: name,
      mode: mode,
    }).then(() => navigate(-1));
  };
  console.log(playlist);
  useEffect(() => {
    setName(playlist?.name);
    if (playlist?.mode === 'private') {
      setVal('2');
    } else {
      setVal('1');
    }
  }, [playlist]);
  return (
    <div className="w-full">
      <ToastContainer />
      <Navbar />
      <div className="bg-gray-200 mx-auto py-10 mt-16 w-2/5 rounded-2xl flex flex-col">
        <div className="flex items-center ml-6">
          <IoMdArrowRoundBack
            className="w-10 h-10 hover:fill-black cursor-pointer absolute"
            style={{ color: '#f9790e' }}
            onClick={() => navigate(-1)}
          />
          <p className="text-4xl mx-auto">Edit Playlist</p>
        </div>
        <label className="ml-16 mt-2 text-xl">Name</label>
        <input
          type="text"
          value={name}
          className="outline outline-[#f9790e] ml-16 w-4/5 py-2 px-3 rounded-lg mt-1"
          onChange={(e) => setName(e.target.value)}
        />
        <label className="ml-16 mt-2  text-xl">Mode</label>
        <RadioGroup
          value={val}
          onChange={setVal}
          className="mt-5 ml-16 rounded-lg py-2 w-fit px-4"
          defaultValue="1"
          background={'white'}
        >
          <Stack spacing={5} direction="row">
            <Radio
              background={'white'}
              size="lg"
              colorScheme="orange"
              value="1"
            >
              Public
            </Radio>
            <Radio
              background={'white'}
              size="lg"
              colorScheme="orange"
              value="2"
            >
              Private
            </Radio>
          </Stack>
        </RadioGroup>
        <button
          className="mt-5 mx-auto w-fit text-xl text-white bg-black cursor-pointer px-4 py-2 rounded-xl"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PlayEdit;
