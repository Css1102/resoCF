import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {addUser} from '../Store/userSlice.js'
import {useNavigate} from 'react-router-dom'
import { BASE_URL } from '../utils/constant.js'
import { Link } from 'react-router-dom'
const Signup = () => {
  const[email,setEmail]=useState('')
  const[firstName,setFirstName]=useState("")
  const[lastName,setLastName]=useState("")
  const[password,setPassword]=useState('')
  const[error,setError]=useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()
  // const[loggedIn,setLoggedIn]=useState(false)
  const handleSignup=async()=>{
  setError("")
  try{
  if(email.length===0 || firstName.length===0 || lastName.length===0 || password.length===0){
  throw new Error("All feilds are mandatory")
  }
  const res=await axios.post(BASE_URL+'/signup',{firstName,lastName,email,password},{withCredentials:true})
  console.log(res.data)
  dispatch(addUser(res.data))
   return navigate('/profile')
  }
  catch(err) {
    if (err.response && err.response.data) {
    setError(err.response.data.message || "Something went wrong");
  } else {
    setError(err.message || "Unexpected error");
  }
  }}
  return (
  <div className="flex justify-center items-center min-h-screen bg-slate-800 px-4">
    <div className="bg-gray-800 border border-gray-700 w-full max-w-md rounded-xl shadow-xl text-white">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        {/* First Name */}
        <label className="flex items-center bg-gray-700 rounded-md p-3 mb-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="bg-transparent outline-none text-white flex-1"
          />
        </label>

        {/* Last Name */}
        <label className="flex items-center bg-gray-700 rounded-md p-3 mb-4">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="bg-transparent outline-none text-white flex-1"
          />
        </label>

        {/* Email */}
        <label className="flex items-center bg-gray-700 rounded-md p-3 mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-transparent outline-none text-white flex-1"
          />
        </label>

        {/* Password */}
        <label className="flex items-center bg-gray-700 rounded-md p-3 mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-transparent outline-none text-white flex-1"
          />
        </label>

        {/* Button + Error */}
        <div className="mt-4">
          {error && <p className="text-sm text-red-500 mb-2 text-center">{error}</p>}
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 transition-all py-2 rounded-md font-semibold"
            onClick={handleSignup}
          >
            Signup
          </button>
        </div>

        {/* Link to Login */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <span>Already have an account? </span>
          <Link to="/login">
            <span className="text-purple-400 font-semibold cursor-pointer hover:underline">
              Login Here
            </span>
          </Link>
        </div>
      </div>
    </div>
  </div>
)
}
export default Signup
