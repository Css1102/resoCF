import React from 'react'
import { useEffect,useState } from 'react'
import { BASE_URL } from '../utils/constant'
import { connect, useDispatch,useSelector} from 'react-redux'
import { addConnection } from '../Store/connectionSlice'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Connections = () => {

const dispatch=useDispatch()
const[searchInput,setSearchInput]=useState("")
const [filteredConnections, setFilteredConnections] = useState([])
const navigate=useNavigate()
let connectionData=useSelector((state)=>state?.connection)
const feedConnections=async()=>{
try{
const userConnections=await axios.get(BASE_URL+'/user/connections',{withCredentials:true})
dispatch(addConnection(userConnections?.data?.data))
}
catch(err){
console.log(err.response)
}
}
useEffect(()=>{
feedConnections()
},[])
useEffect(()=>{
  const lowerInput = searchInput.toLowerCase()
  const filtered=connectionData?.filter((val)=>
  val.firstName?.toLowerCase().includes(lowerInput)||
   val.lastName?.toLowerCase().includes(lowerInput)||
   val.age.toString().includes(lowerInput)
  )
  setFilteredConnections(filtered)
},[searchInput,connectionData])
if(!connectionData){
return
}
if(connectionData.length===0){
return(
<h1 className='mt-20 text-xl text-white'>No connections found!</h1>
)
}
const handleChat=(e,_id)=>{
e.stopPropagation()
navigate(`/chat/${_id}`)
}
  return (
    <div className='text-center py-20'>
    <h1 className="text-bold text-white text-3xl">Connections</h1>
          <label className="input my-8 w-1/2 ">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input type="search" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} className="grow" placeholder="Search by name, age..." />
</label>
    {filteredConnections?.map((item)=>{
            <label className="input">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input type="search" className="grow" placeholder="Search" />
</label>

    const{_id,firstName,lastName,age,gender,photoUrl,about,createdAt}=item
    return(
     
    <div key={_id} onClick={()=>navigate('/viewprofile',{state:item})} className='flex justify-between items-center m-4 p-4 rounded-lg bg-slate-700 w-2/3 h-32 mx-auto'>
        <div>
        <img src={photoUrl} alt="shoes" className='w-20 h-20 rounded-full'/>
        </div>
        <div className='text-left flex flex-col justify-between items-center mx-4'>
        <h2 className="font-bold text-xl text-white">{firstName + " " +lastName}</h2>
        {age && gender && <p className='text-slate-200'>{age + ','+ gender}</p>}
        {/* <p>{about}</p> */}
    </div>
    <div className='ml-10'>
    <button onClick={(e)=>handleChat(e,item._id)} className="btn btn-primary">Chat</button>
    </div>
    </div>
    )
    })}
    </div>
  )
}

export default Connections