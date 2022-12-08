/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { URL } from '../../config/config'
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const ExistingPlaylist = ({ onClose, movie, tabIndex }) => {
  const user = JSON.parse(Cookies.get('user'));
  const [index, setIndex] = useState();
  const [playlist, setPlaylist] = useState([]);

  // TODO: fix toast
  const handleSave = async (e) => {
    e.preventDefault();
    let selected = playlist[index]
    console.log(selected);
    // movie code beyond this
    console.log("movie:", movie);
    try {
      let fetchedMovie = await axios.post(`${URL}/movie/fetch`, movie)
      console.log("Fetched Movie", fetchedMovie.data); // fetchedMovie.data.data[0] when new
      // find or create Mapping. if (exists then throw error that movie is already present)
      let playlistMovieMapping = await axios.post(`${URL}/playlist_movie/fetch`, {
        playlistId: parseInt(selected.id),
        movieId: parseInt(fetchedMovie.data.data[0].id),
      })
      console.log(playlistMovieMapping.data.data);
      console.log(typeof playlistMovieMapping.data.data[1], playlistMovieMapping.data.data[1]);
      // mapping existed => movie is already present in this playlist
      if (!playlistMovieMapping.data.data[1]) {
        console.log("here");
        // toast.error('test')
        toast.error("Already present in the playlist")
      }
      else {
        toast.success('Added to playlist')
      }
      onClose();
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        let playlists = await axios.get(`${URL}/playlist/userId/${user.id}`)
        setPlaylist(playlists.data.data)

      } catch (err) {
        toast.error('Something went wrong')
      }
    }
    getPlaylists()
  }, [])

  return (
    <div className="flex flex-col">
      <ToastContainer />
      <p>Your Playlists</p>
      {playlist.length === 0 ? (
        <p>You have no existing playlists yet!</p>
      ) :
        (<select
          className="mt-4 py-2 w-full px-2"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
        >
          <option value="Select a playlist">Select a playlist</option>
          {playlist &&
            playlist?.map((play, indx) => (
              <option key={indx} value={indx}>
                {play?.name}
              </option>
            ))}
        </select>
        )
      }
      <button
        className="bg-[#f9790e] px-3 py-2 rounded-xl hover:text-white mt-4"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};
export default ExistingPlaylist;
