import axios from "axios";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
const ForgotPwd = ()=>{
    const email = useRef()
    function forgotpwdHandler(e){
        e.preventDefault();
        const data = {
          email: email.current.value
        }
        axios.post('http://localhost:4000/forgotpassword' , data)
        .then(()=>{
          console.log('forgot pwd request sent to backend');
        }).catch((err)=>{
          console.log('forgot pwd sending api error', err);
        })

    }

    return (
        <div className=" min-h-screen flex justify-center items-center p-8">
        <div className="border-4 border-orange-400 p-8 rounded-lg  shadow-md max-w-xl w-full bg-neutral-400 ">
          <h2 className="text-3xl font-bold mb-4 text-center ">Login</h2>
          <form onSubmit={forgotpwdHandler}>
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
              <button type="submit" className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded focus:outline-none">
                Submit
              </button>
            </div>
          </form>
          <Link to="/signup">Don't have an account? Click here and signup</Link>
        </div>
      </div>
    )
}

export default ForgotPwd