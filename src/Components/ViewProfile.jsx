import React from 'react'
import { useLocation } from 'react-router'
import { useMemo } from 'react'
import {useEffect,useCallback} from 'react'
const ViewProfile = () => {
const location=useLocation() 
const user=useMemo(()=>{
return location.state
},[location.state])
  if (!user) {
    return <h1 className="text-white text-center py-20">No user data available</h1>
  }
// useEffect(()=>{
//   console.log(typeof(skills))
// new_skills=skills.toString().split(',,').join(',')
// },[])
   let{ firstName, lastName, age, gender, about, skills, photoUrl,createdAt} = user
  const joinedDate = new Date().toISOString().split('T')[0] 
  const createdDate=createdAt?.split('T')[0]
const userDuration = useMemo(() => {
  if (createdAt) {
    const createdDateObj = new Date(createdAt)
    const currentDateObj = new Date()
    const diffInMs = currentDateObj - createdDateObj
    let diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    if(diffInDays===0){
    diffInDays= "Today"
    }
    else if(diffInDays===1){
    diffInDays= "Yesterday"
    }
    else{
    diffInDays= diffInDays+" "+"days ago"
    }
    return diffInDays
  }
  return "N/A"
}, [createdAt])
  return (
    <div className='flex flex-col md:flex-row justify-between items-start w-full min-h-screen px-8 py-12 gap-8'>
      <div className="md:w-1/3 flex flex-col justify-start items-center gap-6">
        <img src={photoUrl} alt="profile" className='rounded-full h-[200px] w-[200px] shadow-md border-2 border-white' />
        <div className='flex flex-col items-center gap-2'>
          <p className="text-white text-lg">👤 <strong>Gender:</strong> {gender}</p>
          <p className="text-white text-lg">🧠 <strong>Skills:</strong> {skills.join(', ')}</p>
          <p className="text-white text-lg text-left text-wrap">📅  <strong>User since:</strong> {createdDate} ({userDuration})</p>
        </div>
      </div>

      <div className="md:w-2/3 text-white text-left">
        <h1 className="text-3xl font-semibold mb-4">{firstName} {lastName}</h1>
        <p className="text-slate-300 text-lg whitespace-pre-line">{about || "No bio available."}</p>
      </div>
    </div>
  )
}

export default ViewProfile
