/* eslint-disable no-debugger, no-console*/
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { URL } from '../../config/config';
import makeAxiosRequest from '../../utils/utils';
import noFriends from '../../assets/noFriends.gif'
import { Spinner } from '@chakra-ui/react';

const IncomingList = ({ reload, setReload, requests }) => {
    const [list, setList] = useState()
    const [isLoading, setIsLoading] = useState(false)
    console.log("Child", requests);
    const handleRequest = async (e, id, response) => {
        e.preventDefault()
        try {
            let res = await makeAxiosRequest(`${URL}/friends/review/${id}`, "PATCH", {}, { status: response })
            console.log(res.data);
            toast.success(`Friend Request ${response}`)
            setReload(!reload)
        } catch (err) {
            toast.error('Something went wrong!')
        }
    }

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
                                <p className='md:text-lg text-[#f9790e]'>{req.Sender.username}</p>
                                <p className=''>Joined on: {new Date(req.Sender.createdAt).toJSON().slice(0, 10).replace(/-/g, '/')}</p>
                            </div>
                            <div className="flex items-center mt-3">
                                <button className='bg-blue-600 rounded px-1 md:px-3 py-0.5' onClick={(e) => handleRequest(e, req.id, 'Accepted')} >Accept</button>
                                <button className='bg-red-600 rounded px-1 md:px-3 py-0.5 ml-2' onClick={(e) => handleRequest(e, req.id, 'Declined')}>Decline</button>
                            </div>
                        </div>
                    ))) : (
                        <div className="flex flex-col text-center w-full">
                            <p className='text-2xl'>You have no Incoming Requests!</p>
                            <img className='md:mt-6 rounded rounded-xl object-fit w-4/5 md:w-fit h-fit bg-center mx-auto pointer-events-none' src={noFriends} alt="" />
                        </div>
                    )}
                </>
            )}
        </div>

    )
}

export default IncomingList