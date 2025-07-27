import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {addUser} from '../Store/userSlice.js'
import {useNavigate} from 'react-router-dom'
import { BASE_URL } from '../utils/constant.js'
const Login = () => {
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[error,setError]=useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()
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
  return (
    <div className='flex justify-center items-start min-h-screen mt-10 bg-slate-800'>
    <div className="card  w-96 shadow-sm my-10 bg-base-300">
  <div className="card-body">
    <h2 className="card-title ml-28 mb-4">Login</h2>
    <label className="input mb-2">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
</svg>
  <input type="search" value={email} onChange={(e)=>setEmail(e.target.value)} className="grow ml-2" placeholder="Email" />
</label>
<label className="input mb-2">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
</svg>

  <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} className="grow ml-2" placeholder="password" />
</label>
    <div className="card-actions justify-end">
    <p className="text-red-600">{error}</p>
      <button className="btn btn-primary mr-24" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
</div>
)
}
export default Login
