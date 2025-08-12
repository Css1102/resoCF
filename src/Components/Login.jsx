import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {addUser} from '../Store/userSlice.js'
import {useNavigate,useLocation} from 'react-router-dom'
import { BASE_URL } from '../utils/constant.js'
import { Link } from 'react-router-dom'
const Login = () => {
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[error,setError]=useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const location=useLocation()
  // const[loggedIn,setLoggedIn]=useState(false)
  const handleLogin=async()=>{
  setError("")
  try{
  const res=await axios.post(BASE_URL+'/login',{
  email,
  password,
  },{withCredentials:true})
  localStorage.setItem("token",res.data?.token)
  dispatch(addUser(res.data?.user))
  return navigate('/feed')
  }
  catch(err){
    console.error(err.message)
    setError(err.response?.data || "Something went wrong")
  }
  }
//   return (
//   <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-800 to-slate-900">
//     <div className="bg-slate-700 w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
//       <div className="p-8">
//         <h2 className="text-3xl font-extrabold text-center text-white mb-6">Welcome Back</h2>

//         {/* Email Field */}
//         <div className="mb-5">
//           <label className="flex items-center bg-slate-600 rounded-lg px-3 py-2 focus-within:ring-2 ring-indigo-400">
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 13.5h3.86...Z" />
//             </svg>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               className="bg-transparent outline-none text-white ml-3 w-full placeholder-indigo-300"
//             />
//           </label>
//         </div>

//         {/* Password Field */}
//         <div className="mb-5">
//           <label className="flex items-center bg-slate-600 rounded-lg px-3 py-2 focus-within:ring-2 ring-indigo-400">
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 5.25a3...Z" />
//             </svg>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               className="bg-transparent outline-none text-white ml-3 w-full placeholder-indigo-300"
//             />
//           </label>
//         </div>

//         {/* Error Message */}
//         {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

//         {/* Forgot Password */}
//         <div className="flex justify-center items-center text-indigo-300 mb-6">
//           <p className="text-sm">Forgot your password?</p>
//           <Link to="/forgotpassword" className="ml-2 font-semibold hover:underline">
//             Reset Here
//           </Link>
//         </div>

//         {/* Login Button */}
//         <button
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition duration-300"
//           onClick={handleLogin}
//         >
//           Log In
//         </button>
//       </div>
//     </div>
//   </div>
// );
return (
  <div className="flex justify-center items-center min-h-screen bg-slate-800 px-4">
    <div className="bg-gray-800 border border-gray-700 w-full max-w-md rounded-xl shadow-xl text-white">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Email Input */}
        <label className="flex items-center gap-3 bg-gray-700 rounded-md p-3 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-300">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859" />
          </svg>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-transparent outline-none text-white flex-1"
          />
        </label>

        {/* Password Input */}
        <label className="flex items-center gap-3 bg-gray-700 rounded-md p-3 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-300">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818" />
          </svg>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-transparent outline-none text-white flex-1"
          />
        </label>

        {/* Login Button & Error */}
        <div className="mt-4">
          {error && <p className="text-sm text-red-500 mb-2 text-center">{error}</p>}
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 transition-all py-2 rounded-md font-semibold"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>

        {/* Forgot Password */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <span>Forgot your password? </span>
          <Link to="/forgotpassword">
            <span className="text-purple-400 font-semibold cursor-pointer hover:underline">
              Reset Here
            </span>
          </Link>
        </div>
      </div>
    </div>
  </div>
)
}
export default Login
