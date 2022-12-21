/* eslint-disable no-debugger, no-console*/
import React, { useState, useEffect } from 'react'
import noFriends from '../../assets/noFriends.gif'
import { Spinner } from '@chakra-ui/react';

const SentList = ({ requests }) => {
    const [list, setList] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setList(requests)
        setIsLoading(false)
    }, [requests])


    return (
        <div className='flex flex-col my-5'>
            {isLoading || !list ? (
                <div className="m-auto h-screen">
                    <Spinner
                        thickness="4px"
                        position="absolute"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="#f9790e"
                        size="xl"
                    />
                </div>
            ) : (
                <>
                    {list?.length > 0 ? (list?.map(req => (
                        <div key={req.id} className="flex my-2 justify-between items-center w-full md:w-2/5 rounded p-4 rounded-lg bg-black text-white">
                            <div className="flex flex-col">
                                <p className='md:text-lg text-[#f9790e]'>{req.Receiver.username}<span className='text-white'>, Joined on: {new Date(req.Sender.createdAt).toJSON().slice(0, 10).replace(/-/g, '/')}</span></p>
                                <p>Sent on: {new Date(req.createdAt).toJSON().slice(0, 10).replace(/-/g, '/')}</p>
                            </div>
                        </div>
                    ))) : (
                        <div className="flex flex-col text-center w-full">
                            <p className='text-2xl'>No request to show!</p>
                            <img className='md:mt-6 rounded rounded-xl object-fit w-4/5 md:w-fit h-fit bg-center mx-auto pointer-events-none' src={noFriends} alt="" />
                        </div>
                    )}
                </>
            )}
        </div>

    )
}

export default SentList