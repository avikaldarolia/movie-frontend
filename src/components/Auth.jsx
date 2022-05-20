import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import '/App.css';
// import { app } from '../firebase-config';
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
          console.log(response);
          // await addDoc(collection(db, 'users'), {
          //   uid: response.user.uid,
          //   email: inputs.email,
          // });
          await setDoc(doc(db, 'users', response.user.uid), {
            uid: response.user.uid,
            email: inputs.email,
          });
          // await firestore().db.collection('users').doc(response.user.uid).set({
          //   uid: response.user.uid,
          //   email: inputs.email,
          // });
          // .then(() => navigate('/'));
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
    <div className="App w-screen h-screen flex flex-col">
      <p className="bg-white w-fit px-3 py-4 rounded-xl text-4xl font-bold mx-auto mt-16">
        Bot Movies
      </p>
      <div className="flex flex-col mx-auto mt-10 w-1/5 p-8 rounded-xl bg-[#f9790e]">
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
  );
};

export default Auth;
