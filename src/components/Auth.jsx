import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { app } from '../firebase-config';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const Auth = ({ title }) => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({ email: '', password: '' });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const authentication = getAuth();
    // signup
    if (title !== 'Login') {
      createUserWithEmailAndPassword(
        authentication,
        inputs.email,
        inputs.password
      )
        .then((response) => {
          sessionStorage.setItem(
            'Auth Token',
            response._tokenResponse.refreshToken
          );
          //   toast.success('Registeration Successfull');
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
          //   toast.success('Login Successfull');
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
    <div className="flex flex-col mx-auto w-1/5 p-8 rounded-xl bg-red-400 mt-32">
      <ToastContainer />
      <p className="font-bold text-3xl py-2">{title}</p>
      <label className="my-2" htmlFor="">
        Email
      </label>
      <input
        onChange={handleChange}
        name="email"
        value={inputs.email}
        type="text"
        placeholder="Email"
      />
      <label className="my-2" htmlFor="">
        Password
      </label>
      <input
        onChange={handleChange}
        value={inputs.password}
        name="password"
        type="text"
        placeholder="Password"
      />
      <button className="bg-green-200 mt-3" onClick={handleSubmit}>
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
  );
};

export default Auth;
