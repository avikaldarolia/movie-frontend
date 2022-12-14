import React from 'react'
import Navbar from '../Navbar'
import SearchUserBar from '../SearchBar/SearchUserBar'

const Friends = () => {
    return (
        <div className='flex flex-col w-full bg-[#F4F4F4] h-screen'>
            <Navbar />
            <div className="">
                <p>make buttons top right for to see friend requests</p>
                <p className='text-center text-4xl my-10'>
                    Search for friends here
                </p>
                <SearchUserBar />
            </div>
            <div className="flex flex-col items-center py-10">
                <p>
                    Your Friends...
                </p>
                Add logic for showing friend list and if no friend then some gif ( maybe a naruto gif and text saying: learn power of friendship after making some friends)
            </div>
        </div>
    )
}

export default Friends