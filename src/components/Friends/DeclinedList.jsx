/* eslint-disable no-debugger, no-console*/
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { URL } from '../../config/config';
import makeAxiosRequest from '../../utils/utils';
import noFriends from '../../assets/noFriends.gif'
import surprised from '../../assets/surprised.gif'
import { Spinner } from '@chakra-ui/react';

const DeclinedList = ({ reload, setReload, requests }) => {
    const [myDeclined, setMyDeclined] = useState([])
    const [othersDeclined, setOthersDeclined] = useState([])
    // const [list, setList] = useState()
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
        if (requests?.MyDeclined) {
            setMyDeclined(requests.MyDeclined)
        }
        if (requests?.OthersDeclined) {
            setOthersDeclined(requests.OthersDeclined)
        }
        setIsLoading(false)
    }, [requests])


    return (
        <div className='flex flex-col md:my-5'>
            {isLoading || !myDeclined || !othersDeclined ? (
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
                <div className='w-full md:divide-x md:divide-gray-300 flex flex-col md:flex-row'>
                    {/* you declined */}
                    <div className="w-full md:w-1/2 flex flex-col">
                        <p className='text-xl md:text-3xl text-center'>You Declined...</p>
                        <div className='w-11/12 border border-black mx-auto mb-1' />
                        {myDeclined?.length > 0 ? (myDeclined?.map(req => (
                            <div key={req.id} className="flex my-2 mx-auto justify-between items-center w-10/12 md:w-2/5 rounded p-4 rounded-lg bg-black text-white">
                                <div className="flex flex-col">
                                    <p className='text-lg text-[#f9790e]'>{req.Sender.username}</p>
                                    <p className=''>Joined on: {new Date(req.Sender.createdAt).toJSON().slice(0, 10).replace(/-/g, '/')}</p>
                                </div>
                                <div className="flex items-center mt-3">
                                    <button className='bg-blue-600 rounded px-3 py-0.5' onClick={(e) => handleRequest(e, req.id, 'Accepted')} >Accept</button>
                                </div>
                            </div>
                        ))) : (
                            <div className="flex flex-col text-center w-full">
                                <p className='text-2xl mt-2'>No one ^-^</p>
                                <img className='md:mt-6 rounded rounded-xl object-fit w-4/5 md:w-fit h-fit bg-center mx-auto pointer-events-none' src={noFriends} alt="" />
                            </div>
                        )}
                    </div>
                    <div className="w-full md:w-1/2 mt-2 md:mt-0 flex flex-col">
                        <p className='text-xl md:text-3xl text-center'>Your request got declined by</p>
                        <div className='w-11/12 border border-black mx-auto mb-1' />
                        {othersDeclined?.length > 0 ? (othersDeclined?.map(req => (
                            <div key={req.id} className="flex my-2 mx-auto justify-between items-center w-2/5 rounded p-4 rounded-lg bg-black text-white">
                                <div className="flex flex-col">
                                    <p className='text-[#f9790e]'>{req.Receiver.username}<span className='text-white'>, Joined on: {new Date(req.Sender.createdAt).toJSON().slice(0, 10).replace(/-/g, '/')}</span></p>
                                    <p>Sent on: {new Date(req.createdAt).toJSON().slice(0, 10).replace(/-/g, '/')}</p>
                                </div>
                            </div>
                        ))) : (
                            <div className="flex flex-col text-center w-full">
                                <p className='md:text-2xl md:mt-2'>No one...</p>
                                <img className='md:mt-6 rounded rounded-xl object-fit w-4/5 md:w-fit h-[40vh] bg-center mx-auto pointer-events-none' src={surprised} alt="" />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>

    )
}

export default DeclinedList