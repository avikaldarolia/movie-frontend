import React from 'react'
import { useNavigate } from 'react-router'
import Navbar from '../Navbar'
import SearchUserBar from '../SearchBar/SearchUserBar'

const Friends = () => {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col w-full bg-[#F4F4F4] h-screen'>
            <Navbar />
            <div className="flex flex-col">
                <div className="flex justify-around bg-gray-300 items-center py-5">
                    <button onClick={() => navigate('/friends/requests/Declined')} className='py-1 px-3 rounded bg-black text-white'>
                        Declined Requests
                    </button>
                    <button onClick={() => navigate('/friends/requests/Incoming')} className='py-1 px-3 rounded bg-gradient-to-r from-black to-[#f9790e]  hover:from-[#f9790e] hover:to-black text-white'>
                        Incoming Requests
                    </button>
                    <button onClick={() => navigate('/friends/requests/Sent')} className='py-1 px-3 rounded bg-[#f9790e]'>
                        Sent Requests
                    </button>
                </div>
                <p className='text-center text-4xl my-10'>
                    Search for friends here
                </p>
                <SearchUserBar />
            </div>
            {/* <div className="flex flex-col items-center py-10">
                <p>
                    Your Friends...
                </p>
            </div> */}
        </div>
    )
}

export default Friends