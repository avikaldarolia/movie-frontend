import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
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

const Profile = () => {
    const loggedInUser = JSON.parse(Cookies.get('user'))
    let { profileId } = useParams();
    // const navigate = useNavigate();
    const [profileUser, setProfileUser] = useState()
    const [playlist, setPlaylist] = useState();
    const [friends, setFriends] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [mapping, setMapping] = useState(null);
    const [selectedFriend, setSelectedFriend] = useState(null);
    // const [self, setSelf] = useState(false);
    // const { state } = useLocation();
    const [reloadFlag, setReloadFlag] = useState(false)
    // const { id, username } = state; // Read values passed on state
    // let user = parseInt(loggedInUser.id) === parseInt(id) ? 'Your' : `${username}`

    useEffect(() => {
        const getUser = async () => {
            try {
                let profUser = await makeAxiosRequest(`${URL}/user?id=${profileId}`, "GET")
                // console.log(profUser.data.data.rows[0]);
                setProfileUser(profUser.data.data.rows[0])
            } catch (err) {
                console.log(err);
            }
        }
        getUser()

        const checkMapping = async () => {
            let mapping = await makeAxiosRequest(`${URL}/friends/mapping/${profileId}`)
            console.log("mapping,", mapping.data.data);
            setMapping(mapping.data.data)
        }
        checkMapping()

        const getPlaylistWithMoviesAndFriends = async () => {
            try {
                let playlistWithMovies = await makeAxiosRequest(`${URL}/playlist/userId/${profileId}`, "GET")
                setPlaylist(playlistWithMovies.data.data)
                // console.log(playlistWithMovies.data.data);
                let friendList = await makeAxiosRequest(`${URL}/friends/${profileId}`, "GET")
                setFriends(friendList.data.data)
                // console.log("Friends", friendList.data.data);
            } catch (err) {
                toast.error('Something Went Wrong!')
            }
            setIsLoading(false)
        }

        getPlaylistWithMoviesAndFriends()
    }, [profileId, loggedInUser.id, reloadFlag])

    const sendFriendRequest = async () => {
        try {
            await makeAxiosRequest(`${URL}/friends/addFriend`, "POST", {}, { senderId: parseInt(loggedInUser.id), receiverId: parseInt(profileId) })
            toast.success('Friend request sent!')
            setReloadFlag(!reloadFlag)
        } catch (err) {
            toast.error('Something went wrong')
        }
    }

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
                    <div className="flex mx-auto items-center  my-6">
                        <p className='text-center text-4xl'>
                            {`${profileUser.username}'s`}  Profile
                        </p>
                        {mapping ?
                            (mapping?.status === 'Accepted' ?
                                <div className="flex items-center">
                                    <p className='ml-4 py-1 bg-green-300 px-2 rounded text-center'>Friends</p>
                                    <button className='ml-4 py-1 bg-red-300 px-2 rounded text-center'>Remove Friend</button>
                                </div>
                                :
                                <p className='ml-4 py-1 bg-[#f9790e] px-2 rounded text-center'>Check Requests/Declined</p>
                            )
                            :
                            (
                                <button
                                    className={`${!!mapping ? 'hidden' : 'block'} bg-[#f9790e] ml-4 flex items-center py-1 px-2 md:py-1 md:px-2 rounded-lg md:rounded-xl md:mr-24 hover:text-white`}
                                    onClick={sendFriendRequest}
                                >
                                    Send friend request
                                </button>
                            )}
                        {/* {mapping?.status === 'Accepted' && <button className='ml-auto py-1 bg-red-300 px-2 rounded text-center'>Remove Friend</button>} */}
                    </div>
                    <div className="w-full flex divide-x divide-gray-300">
                        <div className="w-1/2" >
                            <p className='text-center text-3xl'>Friends</p>
                            <div className='w-11/12 border border-black mx-auto mb-1' />
                            {friends?.length > 0 ? (
                                <div className="flex bg-gray-300 flex-col my-4 items-center w-4/5 mx-auto shadow rounded divide-y divide-gray-300 ">
                                    {friends.map((friend) => {
                                        let friendObj = friend.Sender.id !== profileId ? friend.Sender : friend.Receiver
                                        friend.username = friendObj.username
                                        return (
                                            <div className="w-full py-1 cursor-pointer flex items-center">
                                                <Link className='w-full text-center' to={parseInt(friendObj.id) === parseInt(loggedInUser.id) ? `/user/profile` : `/user/profile/${friendObj.id}`}>
                                                    <p className='w-full' >{friendObj.username}</p>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col">
                                    <p className="w-4/5 mx-auto md:ml-16 text-xl py-10 md:text-4xl">
                                        {profileUser.username} doesn't have any friends yet...
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
                                        {profileUser.username} doesn't have any playlists yet...
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

export default Profile

