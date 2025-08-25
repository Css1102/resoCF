import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useNavigate } from 'react-router'
const Forgotpassword = () => {
const[email,setEmail]=useState("")
const[newPassword,setNewPassword]=useState("")
const[confirmnewPassword,setConfirmnewPassword]=useState("")
const[error,setError]=useState("")
const[updateMsg,setUpdatemsg]=useState("")
const [visibleMsg, setVisibleMsg] = useState({});
const navigate=useNavigate()
useEffect(() => {
  if (error) {
    setTimeout(() => {
      setVisibleMsg({ text: error, className: "text-red-600" });
    }, 3000);
  } else if (updateMsg) {
    let timeout=setTimeout(() => {
      setVisibleMsg({ text: updateMsg, className: "text-green-600" });
     navigate('/login')
    }, 2000);
    return ()=>
    clearTimeout(timeout)
   }
}, [error, updateMsg]);
const handleReset=async()=>{
setVisibleMsg(null)
setUpdatemsg("")
setError("")

try{
const isReset=await axios.post(BASE_URL+'/profile/forgotPassword',{email,new_password:newPassword,confirm_newpassword:confirmnewPassword},{withCredentials:true})
if(isReset.data){
console.log(isReset.data.message)
setUpdatemsg(isReset.data.message)
}
}
catch(err){
setError(err.response.data)
}
}
return (
  <div className="flex justify-center items-center min-h-screen bg-slate-800 px-4">
    <div className="bg-gray-800 border border-gray-700 w-full max-w-md rounded-xl shadow-xl text-white">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

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

        {/* New Password */}
        <label className="flex items-center bg-gray-700 rounded-md p-3 mb-4">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="bg-transparent outline-none text-white flex-1"
          />
        </label>

        {/* Confirm New Password */}
        <label className="flex items-center bg-gray-700 rounded-md p-3 mb-4">
          <input
            type="password"
            value={confirmnewPassword}
            onChange={(e) => setConfirmnewPassword(e.target.value)}
            placeholder="Confirm Password"
            className="bg-transparent outline-none text-white flex-1"
          />
        </label>

        {/* Message & Button */}
        <div className="mt-4">
          {visibleMsg && <p className={`${visibleMsg.className} text-center mb-2`}>{visibleMsg.text}</p>}
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 transition-all py-2 rounded-md font-semibold"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
)
}

export default Forgotpassword