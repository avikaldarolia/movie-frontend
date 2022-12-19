import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
// import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URL } from '../../config/config';
import makeAxiosRequest from '../../utils/utils';

const SearchUserBar = () => {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const searchUsers = async () => {
            let usernames = await makeAxiosRequest(`${URL}/user/search`, "POST", {}, { username: query })
            setUsers(usernames.data.data)
        }
        if (query !== '') {
            searchUsers()
        }
        else {
            setUsers([])
        }
    }, [query])


    const handleQuery = async (e) => {
        e.preventDefault();
        const usernames = await makeAxiosRequest(`${URL}/user/search`, "POST", {}, { username: query })
        console.log("usernames", usernames.data.data);
        if (usernames?.data.data.length === 0) {
            toast.error("User doesn't exists")
        }
        setUsers(usernames.data.data)
    };
    return (
        <div className="flex flex-col justify-center items-center">
            <ToastContainer />
            <div className="xl:w-96">
                <div className="input-group relative flex items-stretch w-full">
                    <input
                        type="search"
                        className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#f9790e] focus:outline-none"
                        placeholder="Search username..."
                        value={query}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleQuery(e);
                            }
                        }}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        className="btn inline-block px-6 py-2.5 bg-[#f9790e] shadow-md hover:bg-orange-600 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out flex items-center"
                        type="button"
                        id="button-addon2"
                        onClick={handleQuery}
                    >
                        <svg
                            focusable="false"
                            data-prefix="fas"
                            data-icon="search"
                            style={{ color: 'black' }}
                            className="w-4"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                            ></path>
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col items-center w-full shadow rounded rounded-b-xl divide-y divide-gray-300 ">
                    {users?.map((uu) => (
                        <div className="w-full p-2 bg-white">
                            {/* <Link to='userprofile/id'> */}
                            <p onClick={() => navigate('/user/profile', { state: uu })} className=''>{uu.username}</p>
                            {/* </Link> */}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default SearchUserBar;
