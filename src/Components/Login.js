import React, { useRef, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");

  const email = useRef();
  const pwd = useRef();

  const history = useHistory();

  function LoginDataHandler(e) {
    e.preventDefault();
    const inputemail = email.current.value;
    const inputpwd = pwd.current.value;

    const data = {
      email: inputemail,
      password: inputpwd,
    };

    axios
      .post("http://54.234.47.97/login", data)
      .then((response) => {
        alert("logged in successfully");
        //console.log(response.data)
        localStorage.setItem('userId', response.data.Token);
        history.replace("/expense");
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setError(err.response.data.error);
      });
  }

  return (
    <div className=" min-h-screen flex justify-center items-center p-8">
      <div className="border-4 border-orange-400 p-8 rounded-lg  shadow-md max-w-xl w-full bg-neutral-400 ">
        <h2 className="text-3xl font-bold mb-4 text-center ">Login</h2>
        <form onSubmit={LoginDataHandler}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="your email"
              ref={email}
              required="true"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Your Password"
              ref={pwd}
              required="true"
            />
          </div>
          <div className="mb-4">
            <button className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded focus:outline-none">
              Login 
            </button>
          </div>
        </form>
        <Link to="/signup">Don't have an account? Click here and signup</Link><br />
        <Link to="/forgotpwd">Forgot your password ? Click here </Link>
        <h3>{error}</h3>
      </div>
    </div>
  );
};

export default Login;
