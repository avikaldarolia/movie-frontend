import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiHide } from 'react-icons/bi';
import wall from '../assets/wall.jpeg';
import { URL } from "../config/config";
import axios from 'axios';
import Cookies from 'js-cookie'
const Auth = ({ title }) => {
  let jwt = Cookies.get('jwt')
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    if (jwt) {
      return <Navigate to='/' />
    }
  }, [jwt])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // signup
    if (title !== 'Login') {
      try {
        let response = await axios.post(`${URL}/auth/signup`, inputs).catch(function (err) {
          if (err.code === "ERR_NETWORK") {
            toast.error('Server is not live')
          }
        })

        if (!response) {
          return;
        }

        if (!response.data.success) {
          toast.error(response.data.error)
          return;
        }

        Cookies.set('jwt', JSON.stringify(response.data.data.jwt))
        Cookies.set('user', JSON.stringify(response.data.data.user))
        navigate('/')
      } catch (err) {
        if (err.toJSON().message === 'Network Error') {
          toast.error('Server is not live')
          return;
        }
        toast.error('Invalid Credentials');
      }
    }
    // login
    else {
      try {
        let response = await axios.post(`${URL}/auth/login`, inputs).catch(function (err) {
          if (err.code === "ERR_NETWORK") {
            toast.error('Server is not live')
          }
        })

        if (!response) {
          return;
        }

        if (!response.data.success) {
          toast.error(response.data.error)
          return;
        }
        Cookies.set('jwt', JSON.stringify(response.data.data.jwt))
        Cookies.set('user', JSON.stringify(response.data.data.user))
        navigate('/')

      } catch (err) {
        toast.error('Something went wrong');
      }
    }
  };
  return (
    <div className="w-full h-screen flex flex-col bg-black">
      <p className="text-white mx-auto mt-12 md:mt-16 text-2xl md:text-5xl font-bold">Bot-Movies</p>
      <div className="flex flex-col md:flex-row w-11/12 mx-auto md:mx-none md:w-full mt-8 md:mt-16">
        <div className="w-1/2 ml-64 bg-gray-200 rounded-tl-xl rounded-bl-xl hidden md:block">
          <img
            src={wall}
            className="h-full w-fit object-fit rounded-tl-xl rounded-bl-xl"
            alt=""
          />
        </div>
        <div className="flex flex-col mx-auto w-11/12 md:w-1/2 p-10 rounded-tl-xl md:rounded-tl-none rounded-tr-xl rounded-bl-xl md:rounded-bl-none rounded-br-xl bg-[#f9790e] md:mr-64">
          <ToastContainer />
          <p className="font-bold text-3xl py-2">{title}</p>
          <label className="my-2 text-lg">Email</label>
          <input
            onChange={handleChange}
            name="email"
            value={inputs.email}
            type="text"
            className="py-2 rounded-lg pl-2"
            placeholder="Email"
          />
          <label className="my-2 text-lg">Password</label>
          <div className="w-full relative flex items-center">
            <input
              onChange={handleChange}
              value={inputs.password}
              name="password"
              type={show ? 'text' : 'password'}
              className="py-2 rounded-lg pl-2 w-full"
              placeholder="Password"
            />
            <button className="absolute right-3" onClick={() => setShow(!show)}>
              <BiHide />
            </button>
          </div>
          <button
            className="bg-black py-2 rounded-lg text-white mt-6"
            onClick={handleSubmit}
          >
            Submit
          </button>
          {title === 'Login' ? (
            <p className="text-xs mt-3">
              New here?
              <Link to="/signup">
                {' '}
                <u>Signup</u>
              </Link>
            </p>
          ) : (
            <p className="text-xs mt-3">
              Already have an account?
              <Link to="/login">
                {' '}
                <u>Login</u>
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
