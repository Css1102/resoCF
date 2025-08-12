import React from 'react'
import sample_img from '../assets/sample_img.png'
import { useEffect,useState } from 'react';
import axios from 'axios'
import { BASE_URL } from '../utils/constant';
import { useDispatch,useSelector } from 'react-redux';
import { removeFromFeed } from '../Store/feedSlice';
const UserCard = ({user,method=()=>{}}) => {
   const dispatch=useDispatch()
   const curr_user=useSelector((state)=>state?.user)
   const [matchlvl,setMatchlvl]=useState("")
   const curr_id=curr_user._id
    const{_id,firstName,lastName,photoUrl,age,gender,aboutskills}=user;
    const handleSaveRequest=async(status,_id)=>{
    try{
    const res=await axios.post(BASE_URL+'/request/send/'+status+'/' +_id,{},
    {withCredentials:true}
    )
    dispatch(removeFromFeed(_id))
  }
  catch(err){
  console.error(err.response?.data)
  }
    }
useEffect(() => {
  const evaluateMatchLevel = async () => {
    const result = await method(curr_id, _id)
    setMatchlvl(result)
  }
  evaluateMatchLevel()
}, [_id])
  return (
  <div className="bg-gray-900 text-white w-full max-w-sm  mx-auto mt-20 h-[280px] rounded-xl shadow-lg overflow-hidden border border-gray-700">
    <div className="p-5 relative">
      {matchlvl && (
        <span
          className={`absolute top-4 right-4 px-2 py-1 rounded-md text-xs font-semibold ${
            matchlvl === 'High'
              ? 'bg-red-600'
              : matchlvl === 'Medium'
              ? 'bg-yellow-400 text-black'
              : 'bg-green-500'
          }`}
        >
          {matchlvl}
        </span>
      )}
      <div className="flex flex-col items-center gap-3">
        <img
          src={photoUrl}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-white"
        />
        <h2 className="text-lg font-bold text-center truncate max-w-[90%]">
          {firstName + ' ' + lastName}
        </h2>
        {age && gender && (
          <p className="text-sm text-gray-300">{`${age}, ${gender}`}</p>
        )}
      </div>
    </div>

    {/* Action Buttons */}
    <div className="bg-gray-800 px-5 py-4 flex justify-between items-center">
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition-all"
        onClick={() => handleSaveRequest('ignored', _id)}
      >
        Ignore
      </button>
      <button
        className="bg-pink-500 hover:bg-pink-600 text-white text-sm px-4 py-2 rounded transition-all"
        onClick={() => handleSaveRequest('interested', _id)}
      >
        Interested
      </button>
    </div>
  </div>
)
}

export default UserCard