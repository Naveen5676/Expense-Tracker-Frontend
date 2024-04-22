import React, { useRef } from "react";
import axios from "axios";

const Signup = () => {
    const name = useRef();
    const email = useRef();
    const pwd = useRef();

  function SignupDataHandler(e) {
    e.preventDefault();
    const inputname = name.current.value
    const inputemail = email.current.value
    const  inputpwd = pwd.current.value

    const data={
        name:inputname ,
        email:inputemail,
        password:inputpwd
    }

    axios.post('', data).then(()=>{
        console.log('data sent to server' , data)
    }).catch(err=>console.log(err))
  }

  return (
    <div className=" min-h-screen flex justify-center items-center p-8">
      <div className="border-4 border-orange-400 p-8 rounded-lg  shadow-md max-w-xl w-full bg-neutral-400 ">
        <h2 className="text-3xl font-bold mb-4 text-center ">Sign up</h2>
        <form onSubmit={SignupDataHandler}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              {" "}
              Name{" "}
            </label>
            <input
              className="appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shad-outline "
              placeholder="Your Name"
              type="text"
              id="name"
              ref={name}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shad-outline"
              id="email"
              type="email"
              placeholder="your email"
              ref={email}
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
            />
          </div>
          <div className="mb-4">
            <button className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded focus:outline-none">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
