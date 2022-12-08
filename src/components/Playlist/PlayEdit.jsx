import { Radio, RadioGroup, Spinner, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar';
import { IoMdArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import { URL } from '../../config/config';

const PlayEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState();
  const [name, setName] = useState(playlist?.name);
  const [val, setVal] = useState('1');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPlay = async () => {
      const play = await axios.get(`${URL}/playlist`, { params: { id: parseInt(params.id) } })
      setPlaylist(play.data.data.rows[0])
      setName(play.data.data.rows[0].name)
      setIsLoading(false)
    };
    getPlay();
  }, [params.id]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (name.length < 1) {
      toast.error('No name entered');
      return;
    }

    try {
      await axios.put(`${URL}/playlist/${playlist.id}`, { name, isPrivate: val !== '1' ? true : false })
      toast.success('Playlist updated')
      navigate(-1)
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!')
      return
    }
  };

  useEffect(() => {
    setName(playlist?.name);
    if (playlist?.isPrivate) {
      setVal('2');
    } else {
      setVal('1');
    }
  }, [playlist]);
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
        <div className="bg-black mx-auto py-4 md:py-10 mt-8 md:mt-16 w-4/5 md:w-2/5 rounded-xl md:rounded-2xl flex flex-col outline outline-[#f9790e]">
          <div className="flex items-center ml-3 md:ml-6">
            <IoMdArrowRoundBack
              className="w-6 h-6 md:w-10 md:h-10 hover:fill-black cursor-pointer absolute"
              style={{ color: '#f9790e' }}
              onClick={() => navigate(-1)}
            />
            <p className="text-xl text-white md:text-4xl mx-auto">Edit Playlist</p>
          </div>
          <label className="mt-2 w-4/5 mx-auto md:text-xl text-white px-3">Name</label>
          <input
            type="text"
            value={name}
            className="outline outline-[#f9790e] mx-auto w-4/5 py-1 md:py-2 px-3 rounded-lg mt-1"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="mt-5 w-4/5 mx-auto md:text-xl text-white px-3">Mode</label>
          <RadioGroup
            value={val}
            onChange={setVal}
            className="mt-1 mx-auto rounded-lg py-1 md:py-2 w-4/5 px-4 outline outline-[#f9790e]"
            defaultValue="1"
            background={'white'}
          >
            <Stack spacing={5} direction="row">
              <Radio
                background={'white'}
                size="lg"
                colorScheme="orange"
                value="1"
                defaultChecked={playlist?.isPrivate ? false : true}
              >
                Public
              </Radio>
              <Radio
                background={'white'}
                size="lg"
                colorScheme="orange"
                value="2"
                defaultChecked={playlist?.isPrivate ? true : false}
              >
                Private
              </Radio>
            </Stack>
          </RadioGroup>
          <button
            className="mt-5 mx-auto bg-gray-500 w-4/5 md:w-fit md:text-xl text-white cursor-pointer px-4 py-2 rounded-xl"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayEdit;
