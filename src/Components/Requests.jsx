import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { BASE_URL } from '../utils/constant'
import { addRequest,removeRequest } from '../Store/requestSlice'
import sample_img from '../assets/sample_img.png'
const Requests = () => {
  const dispatch=useDispatch()
  const requestsRightNow=useSelector((state)=>state?.request)
  const requestRecieved=async()=>{
  try{
  const res=await axios.get(BASE_URL+'/user/requests/recieved',{withCredentials:true})
  dispatch(addRequest(res.data?.data))
  }
  catch(err){
  console.error(err.message)
  }
  }
  const handleRequest=async(status,_id)=>{
  const res=await axios.post(BASE_URL+'/request/review/'+status+"/"+_id,{},{withCredentials:true})
  dispatch(removeRequest(_id))
  }
  useEffect(()=>{
  requestRecieved()
  },[])
  if(!requestsRightNow){
  return
  }
  if(requestsRightNow.length===0){
  return(
  <h1 className='text-white text-xl py-20'>No requests found!</h1>
  )
  }
    return (
      <div className='text-center py-10'>
      <h1 className="text-bold text-white text-3xl">Requests</h1>
      {requestsRightNow.map((item)=>{
      const{_id,firstName,lastName,age,gender,photoUrl,about}=item.requestFrom
return(
     <div key={_id} className='flex justify-between items-center m-4 p-4 rounded-lg bg-slate-700  w-2/3 h-32 mx-auto'>
          <div>
          <img src={photoUrl} alt="Shoes" className='w-20 h-20 ml-12 rounded-full'/>
          </div>
          <div className='text-left mx-4 flex flex-col w-[220px] justify-between items-center'>
          <h2 className="font-bold text-xl text-white relative">{firstName + " " +lastName}</h2>
          {age && gender && <p className='text-white text-lg  '>{age + ','+ gender}</p>}
          {/* <p>{about}</p> */}
      </div>
      <div>
<button className="btn btn-active btn-primary mx-2" onClick={()=>handleRequest("accepted",item._id)}>Accept</button>
<button className="btn btn-active btn-secondary mx-2" onClick={()=>handleRequest("rejected",item._id)}>Reject</button>
 </div>
      </div>
      );
      })}
      </div>
    );
  
};

export default Requests