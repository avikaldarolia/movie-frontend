import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiHide } from 'react-icons/bi';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { db } from '../firebase-config';
import wall from '../assets/wall.jpeg';
const Auth = ({ title }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const authentication = getAuth();
    // signup
    if (title !== 'Login') {
      await createUserWithEmailAndPassword(
        authentication,
        inputs.email,
        inputs.password
      )
        .then(async (response) => {
          sessionStorage.setItem(
            'Auth Token',
            response._tokenResponse.refreshToken
          );

          await setDoc(doc(db, 'users', response.user.uid), {
            uid: response.user.uid,
            email: inputs.email,
          });

          navigate('/');
        })
        .catch((err) => {
          if (err.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
          }
        });
    }
    // login
    else {
      signInWithEmailAndPassword(authentication, inputs.email, inputs.password)
        .then((response) => {
          sessionStorage.setItem(
            'Auth Token',
            response._tokenResponse.refreshToken
          );
          navigate('/');
        })
        .catch((err) => {
          if (err.code === 'auth/user-not-found') {
            toast.error('No user found with this email');
          } else {
            toast.error('Invalid Credentials');
          }
        });
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col bg-black">
      <p className="text-white mx-auto mt-16 text-5xl">Bot-Movies</p>
      <div className="flex w-full mt-16 h-fit">
        <div className="w-1/2 ml-64 bg-gray-200 rounded-tl-xl rounded-bl-xl">
          <img src={wall} className="h-full w-fit" alt="" />
        </div>
        <div className="flex flex-col mx-auto w-1/2 p-10 rounded-tr-xl rounded-br-xl bg-[#f9790e] mr-64">
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
