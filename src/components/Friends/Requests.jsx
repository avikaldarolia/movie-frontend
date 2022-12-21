import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router'
// import { Link } from 'react-router-dom'
import { URL } from '../../config/config'
import makeAxiosRequest from '../../utils/utils'
import Navbar from '../Navbar'
import DeclinedList from './DeclinedList';
import IncomingList from './IncomingList'
import SentList from './SentList';

const Requests = () => {
    const navigate = useNavigate()
    const { status } = useParams()
    const [requests, setRequests] = useState()
    const [reload, setReload] = useState(false)

    useEffect(() => {
        const getRequestList = async () => {
            let list = await makeAxiosRequest(`${URL}/friends/requests/${status}`)
            console.log("Parent", list.data.data);
            setRequests(list.data.data)
        }
        getRequestList()
    }, [status, reload])

    return (
        <div className='flex bg-[#F4F4F4] flex-col h-screen'>
            <Navbar />
            <div className="flex items-center w-full  bg-gray-300 py-4 w-full relative">
                <IoMdArrowRoundBack className='absolute left-1 md:left-7 fill-black hover:fill-[#f9790e] ml-4 w-8 h-8 cursor-pointer' onClick={() => navigate(-1)} />
                <p className='text-center w-full text-xl md:text-5xl'>{status} Requests</p>
            </div>
            <div className="w-4/5 mx-auto my-5">
                {status === 'Incoming' ? (<IncomingList reload={reload} setReload={setReload} requests={requests} />) :
                    (status === 'Sent' ? <SentList requests={requests} /> : <DeclinedList reload={reload} setReload={setReload} requests={requests} />)
                }
            </div>
        </div>
    )
}

export default Requests