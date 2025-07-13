import React from 'react'
import sample_img from '../assets/sample_img.png'
import { useEffect } from 'react';
import axios from 'axios'
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removeFromFeed } from '../Store/feedSlice';
const UserCard = ({user}) => {
   const dispatch=useDispatch()
    const{_id,firstName,lastName,photoUrl,age,gender,aboutskills}=user;
    console.log(_id)
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
  return (
    <div className="card bg-base-300 w-80 h-[500px] shadow-sm my-4">
  <figure className=''>
    <img
      src={photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body ">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {age && gender && <p>{age + ", "+gender}</p>}
     {/* <p>{about}</p> */}
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={()=>handleSaveRequest("ignored",_id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=>handleSaveRequest("interested",_id)}>Interested</button>
    </div>
  </div>
</div>

  )
}

export default UserCard