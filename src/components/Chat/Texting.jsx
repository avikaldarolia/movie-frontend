import React, { useEffect, useState } from 'react'

const Texting = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState()
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date()).getMinutes()
            }
            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData])
        }
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data);
            setMessageList((list) => [...list, data])
        })
    }, [socket])


    return (
        <div className='flex flex-col'>
            <p className='text-center text-2xl'>Live Chat</p>
            <p>Room: {room}, username: {username}</p>
            {/* chat body */}
            <div className="border border-black rounded-lg">
                <div className="h-96 w-80 flex flex-col mx-auto overflow-y overflow-x-hidden">
                    {
                        messageList?.map(msg => {
                            let self = username === msg.author ? true : false
                            return (
                                <div className={`flex ${self && 'flex-row-reverse'} my-1 mx-4`}>
                                    <div className="flex flex-col">
                                        <p className={`${self ? 'bg-blue-300' : 'bg-green-300'} rounded-lg px-3`}>{msg.message}</p>
                                        <p className='text-xs'>{msg.time}, {msg.author}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {/* chat footer */}
                <div className="flex items-center w-80 rounded-b-lg  border-2 border-[#f9790e] outline-[#f9790e]">
                    <input
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        name="room"
                        value={currentMessage}
                        type="text"
                        className={`w-full pl-2 rounded-b-lg outline-none`}
                        placeholder="Type a message..."
                    />
                    <button onClick={() => { sendMessage(); setCurrentMessage('') }} className='bg-[#f9790e] border border-[#f9790e] px-3 py-2 rounded-l-lg hover:text-white'>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Texting