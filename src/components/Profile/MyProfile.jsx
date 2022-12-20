import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router'
import { URL } from '../../config/config'
import makeAxiosRequest from '../../utils/utils'
import Navbar from '../Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlayCard from '../Playlist/PlayCard'
import lonely from '../../assets/lonely.gif'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Spinner
} from '@chakra-ui/react'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'

const MyProfile = () => {
    const user = JSON.parse(Cookies.get('user'))
    // const navigate = useNavigate();
    const [playlist, setPlaylist] = useState();
    const [friends, setFriends] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [reloadFlag, setReloadFlag] = useState(false)

    useEffect(() => {
        const getPlaylistWithMoviesAndFriends = async () => {
            try {
                let playlistWithMovies = await makeAxiosRequest(`${URL}/playlist/userId/${user.id}`, "GET")
                setPlaylist(playlistWithMovies.data.data)
                let friendList = await makeAxiosRequest(`${URL}/friends/${user.id}`, "GET")
                setFriends(friendList.data.data)
                console.log("Friends", friendList.data.data);
            } catch (err) {
                toast.error('Something Went Wrong!')
            }
            setIsLoading(false)
        }

        getPlaylistWithMoviesAndFriends()
    }, [user.id, reloadFlag])

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            await makeAxiosRequest(`${URL}/friends/removeFriend`, "POST", {}, { id: parseInt(selectedFriend.id) })
            toast.success(`${selectedFriend.username} remove from friends`)
            setReloadFlag(true)
            onClose()
        } catch (err) {
            toast.error('Something went wrong')
        }
    }

    return (
        <div className='flex flex-col'>
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
                    <div className="flex justify-center items-center  my-6">
                        <p className='text-center text-4xl'>
                            Your Profile
                        </p>
                    </div>
                    <div className="w-full flex divide-x divide-gray-300">
                        <div className="w-1/2" >
                            <p className='text-center text-3xl'>Friends</p>
                            <div className='w-11/12 border border-black mx-auto mb-1' />
                            {friends?.length > 0 ? (
                                <div className="flex bg-gray-300 flex-col my-4 items-center w-4/5 mx-auto shadow rounded divide-y divide-gray-300 ">
                                    {friends.map((friend) => {
                                        let friendObj = friend.Sender.username !== user.username ? friend.Sender : friend.Receiver
                                        friend.username = friendObj.username
                                        return (
                                            <div className="w-full py-1 cursor-pointer flex items-center">
                                                <Link to={`/user/profile/${friendObj.id}`} className='w-full text-center'>
                                                    <p>
                                                        {friendObj.username}
                                                    </p>
                                                </Link>
                                                <MdDelete className='mr-4 fill-red-500' onClick={() => { setSelectedFriend(friend); onOpen() }} />
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col">
                                    <p className="w-4/5 mx-auto md:ml-16 text-xl py-10 md:text-4xl">
                                        You don't have any friends yet...
                                    </p>
                                    <img className='md:mt-6 rounded rounded-xl object-fit w-4/5 md:w-fit h-fit bg-center mx-auto pointer-events-none' src={lonely} alt="empty" />
                                </div>
                            )}
                        </div>
                        <div className="w-1/2" >
                            <p className='text-center text-3xl'>Playlists</p>
                            <div className='w-11/12 border border-black mx-auto mb-1' />
                            {playlist?.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mx-8 md:mx-auto mt-4 md:mt-8">
                                    {playlist &&
                                        playlist.map((ply, indx) => (
                                            <PlayCard
                                                key={indx}
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
                        </div>
                    </div>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent className="flex my-auto">
                            <ModalHeader className="">Delete Playlist</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <p className='mt-2 mb-10'>Are you sure you want to remove <b>{selectedFriend?.username}</b> as your friend? </p>
                            </ModalBody>

                            <ModalFooter>
                                <button
                                    className={`text-white bg-red-500 cursor-pointer px-3 py-2 rounded-xl`}
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            )}
        </div>
    )
}

export default MyProfile

