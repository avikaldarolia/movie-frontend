import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };
  return (
    <div className="flex flex-col mx-auto w-1/5 p-8 rounded-xl bg-red-400 mt-32">
      <p className="font-bold text-3xl py-2">Login</p>
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
      <p className="text-xs mt-3">
        New here?
        <Link to="/signup">
          {' '}
          <u>Signup</u>
        </Link>
      </p>
    </div>
  );
};

export default Login;
