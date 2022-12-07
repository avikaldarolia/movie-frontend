import { Radio, RadioGroup, Stack, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import { URL } from '../../config/config';

const NewPlaylistModal = ({ onClose, movie }) => {
  const user = JSON.parse(Cookies.get('user'));
  const [val, setVal] = useState('1');
  const [name, setName] = useState('');

  // TODO: 1. check if the name of this playlist is valid or not.  (done)
  // 2. Create a new Playlist. (done)
  // 3. If movie is not present in Db? then Create else Fetch.
  // 4. Create the mapping of playlist and movie
  const handleSave = async (e) => {
    e.preventDefault();
    if (name.length < 1) {
      toast.error('Please provide a name');
      return;
    }
    let playlistData = {
      name,
      userId: parseInt(user.id),
      isPrivate: val === '1' ? false : true
    }

    try {
      let newPlaylist = await axios.post(`${URL}/playlist`, playlistData);
      console.log('np;', newPlaylist);
      if (!newPlaylist.data.data) {
        toast.error(newPlaylist.data.error)
        return;
      }
      console.log(newPlaylist.data.data); // gives data
      // movie code
      let fetchedMovie = await axios.post(`${URL}/movie/fetch`, movie)
      // movie mapping
      let playlistMovieMapping = await axios.post(`${URL}/playlist_movie/fetch`, {
        playlistId: parseInt(newPlaylist.data.data.id),
        movieId: parseInt(fetchedMovie.data.data[0].id),
      })
      console.log(playlistMovieMapping.data.data);
      toast.success('Movie added to the new playlist!')
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }

    // const docRef = await addDoc(collection(db, 'playlists'), {
    //   uid: user.uid,
    //   name: name,
    //   mode: mode,
    //   movies: [movie],
    // });
    // const playRef = doc(db, 'playlists', docRef.id);
    // await updateDoc(playRef, {
    //   pid: docRef.id,
    // });
    onClose();
  };
  return (
    <div className="">
      <ToastContainer />
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
      <button
        className="bg-[#f9790e] px-3 py-2 rounded-xl hover:text-white mt-4"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default NewPlaylistModal;
