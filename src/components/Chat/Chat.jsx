import React, { useState } from 'react'
import Navbar from '../Navbar'
import io from 'socket.io-client'
import Texting from './Texting'

// const socket = io.connect('http://localhost:8000')
const socket = [];

const Chat = () => {
    const [username, setUsername] = useState();
    const [room, setRoom] = useState();
    const [inRoom, setInRoom] = useState(false)
    const joinRoom = () => {
        if (username !== '' && room !== '') {
            socket.emit('join_room', room)
            setInRoom(true)
        }
    }

    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            <p className='bg-gray-300 py-2 md:py-6 md:text-4xl text-center'>Chat with your friends</p>
            <div className={`flex flex-col items-center my-10 w-4/5 md:w-2/5 mx-auto`}>
                <div className={`w-full ${inRoom ? 'hidden' : 'block'}`}>
                    <label className={`my-2 text-lg`}>Username</label>
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        name="username"
                        value={username}
                        type="text"
                        className={`py-2 w-full rounded-lg border border-[#f9790e] pl-2 outline-[#f9790e]`}
                        placeholder="Username..."
                    />
                    <label className={`my-2 text-lg`}>Room ID</label>
                    <input
                        onChange={(e) => setRoom(e.target.value)}
                        name="room"
                        value={room}
                        type="text"
                        className={`py-2 w-full rounded-lg border border-[#f9790e] pl-2 outline-[#f9790e]`}
                        placeholder="Room ID"
                    />
                    <button onClick={joinRoom} className='bg-[#f9790e] w-full p-3 rounded rounded-lg hover:text-white mt-5'>Join Room</button>
                </div>
                {inRoom && <Texting socket={socket} username={username} room={room} />}
            </div>
        </div>
    )
}

export default Chat