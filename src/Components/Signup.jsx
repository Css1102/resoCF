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
  const res=await axios.post(BASE_URL+'/signup',{firstName,lastName,email,password},{withCredentials:true})
  console.log(res.data)
  dispatch(addUser(res.data))
   return navigate('/profile')
  }
  catch(err){
  console.error(err.message)
  }
  }
  return (
    <div className='flex justify-center items-start min-h-screen bg-slate-800 pt-20'>
    <div className="card  w-96 shadow-sm my-4 bg-base-300">
  <div className="card-body">
    <h2 className="card-title ml-28 mb-4">Signup</h2>
        <label className="input mb-2">
  <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="grow ml-2" placeholder="firstName" />
</label>
    <label className="input mb-2">
  <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="grow ml-2" placeholder="lastName" />
</label>

    <label className="input mb-2">
  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="grow ml-2" placeholder="Email" />
</label>
<label className="input mb-2">
  <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} className="grow ml-2" placeholder="password" />
</label>
    <div className="card-actions justify-end">
    <p className="text-red-600">{error}</p>
    <button className="btn btn-primary mr-24" onClick={handleSignup}>Signup</button>
    </div>
    <div className='flex justify-center items-center'>
    <p className='text-sm font-medium'>New to this page?</p>
    <Link to='/login'><p className="text-base font-bold cursor-pointer relative right-8">Login Here</p></Link>
    </div>
  </div>
</div>
</div>
)
}
export default Signup
