import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { URL } from '../../config/config'
import makeAxiosRequest from '../../utils/utils'
import Navbar from '../Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MovieCard from '../Movie/MovieCard'
import nomovie from '../../assets/nomovie.gif'

const Profile = () => {
    const loggedInUser = JSON.parse(Cookies.get('user'))
    // let { userId } = useParams();
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { state } = useLocation();
    const [reloadFlag, setReloadFlag] = useState(false)
    const { id, username } = state; // Read values passed on state
    let user = parseInt(loggedInUser.id) === parseInt(id) ? 'Your' : `${username}`
    console.log('STATE', id);
    useEffect(() => {
        const getPlaylistWithMovies = async () => {
            try {
                let playlistWithMovies = await makeAxiosRequest(`${URL}/playlist/${id}`, "GET")
                setPlaylist(playlistWithMovies.data.data)
                console.log(playlistWithMovies.data.data);
            } catch (err) {
                toast.error('Something Went Wrong!')
            }
            setIsLoading(false)
        }
        getPlaylistWithMovies()

    }, [id])
    return (
        <div className='flex flex-col'>
            <ToastContainer />
            <Navbar />
            <p className='text-center text-4xl my-6'>
                {`${user}`}  Profile
            </p>
            <div className="w-full flex divide-x divide-gray-300">
                <div className="w-1/2" >
                    <p className='text-center text-3xl'>{`${user}`} Friends</p>
                    <div className="">
                        List of friends
                    </div>
                </div>
                <div className="w-1/2" >
                    <p className='text-center text-3xl'>{`${user}`} Playlists</p>
                    list of {user} playlist
                    {/* {playlist.Movies === undefined || playlist?.Movies.length < 1 ? (
                        <div className="flex flex-col">
                            <p className="mx-auto my-6 md:mt-12 md:text-3xl">
                                Seems a bit empty here... <br /> Add some movies to see
                                the changes.
                            </p>
                            <img className='md:mt-16 rounded rounded-xl object-fit w-4/5 md:w-fit bg-center mx-auto pointer-events-none' src={nomovie} alt="" />
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-10 md:mx-28 mt-4 md:mt-8">
                            {playlist?.Movies?.map((movie, indx) => (
                                <MovieCard
                                    key={indx}
                                    name={movie.title}
                                    poster={movie.poster}
                                    imdb={movie.imdbID}
                                    mapping={movie.Playlist_Movie}
                                    setReloadFlag={setReloadFlag}
                                    reloadFlag={reloadFlag}
                                />
                            ))} 
                        </div>
                     )} */}
                </div>
            </div>
        </div>
    )
}

export default Profile