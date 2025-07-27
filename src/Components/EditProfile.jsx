import React from 'react'
import { useState,useEffect } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { BASE_URL } from '../utils/constant'
import { addUser } from '../Store/userSlice'
const EditProfile = ({user}) => {
const[firstName,setFirstName]=useState(user.firstName)
const[lastName,setLastName]=useState(user.lastName)
const[age,setAge]=useState(user.age)
const[gender,setGender]=useState(user.gender || "tbd")
const[photoUrl,setPhotoUrl]=useState(user.photoUrl || " ")
const[error,setError]=useState("")
const[about,setAbout]=useState("")
let[skills,setSkills]=useState("")
let[skillsArr,setSkillsArr]=useState([])
const[isSaved,setIsSaved]=useState(false)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const newSkills=(skills)=>{
  const arrSkills=Array.from(skills.split(" "))
  setSkillsArr(arrSkills)
  }  

useEffect(()=>{
  newSkills(skills)
},[skills])

useEffect(() => {
  if (user) {
    setFirstName(user.firstName || "")
    setLastName(user.lastName || "")
    setAge(user.age || "")
    setGender(user.gender || "tbd")
    setPhotoUrl(user.photoUrl || " ")
    setAbout(user.about || "")
    setSkills(user.skills?.join(" ") || "")
  }
},[])
const saveProfile = async () => {
  setError("")
  try {
    const res = await axios.patch(BASE_URL + '/profile/edit', {
      firstName,
      lastName,
      age,
      gender,
      photoUrl,
      skills: skillsArr,
      about
    }, { withCredentials: true })

    dispatch(addUser(res?.data?.data))

    // Show success message immediately
    setIsSaved(true)
    // Hide success message after 3 seconds
    setTimeout(() =>{
    setIsSaved(false)
    navigate('/feed')
    },3000)
  } catch (err) {
    console.error(err.message)
    setError(err.message)
  }
}
  return (
    <div className='flex justify-evenly items-start min-h-screen pt-8 bg-slate-800'>
    <div className="card  w-96 h-[500px] shadow-sm my-4 bg-base-300">
 {
  isSaved && error.length==0 && (<div className="toast toast-top toast-center">
  <div className="alert alert-success mt-12">
    <span>Profile saved successfully.</span>
  </div>
</div>)}
  <div className="card-body py-0 flex flex-col gap-2 items-start justify-center">
    <h2 className="card-title ml-24">Edit Profile</h2>
    <label className="input mb-2">
  <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="grow ml-2" placeholder="firstName" />
</label>
<label className="input mb-2">
  <input type="text" value={lastName}  onChange={(e)=>setLastName(e.target.value)} className="grow ml-2" placeholder="lastName" />
</label>
    <label className="input mb-2">
  <input type="text" value={age} onChange={(e)=>setAge(e.target.value)} className="grow ml-2" placeholder="age" />
</label>
    <label className="input mb-2">
  <input type="text" value={gender} onChange={(e)=>setGender(e.target.value)} className="grow ml-2" placeholder="gender" />
</label>
    <label className="input mb-2">
  <input type="text" value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)} className="grow ml-2" placeholder="photoUrl" />
</label>
    <label className="input mb-2">
  <input type="text" value={skills} onChange={(e)=>setSkills(e.target.value)} className="grow ml-2" placeholder="skills" />
</label>

    <label className="input mb-2">
  <input type="text" value={about} onChange={(e)=>setAbout(e.target.value)} className="grow ml-2 text-left" placeholder="about" />
</label>

    <div className="card-actions justify-between">
    <p className="text-red-500 ease-out">{error}</p>
      <button className="btn btn-primary ml-16" onClick={saveProfile} >Save Profile</button>
    </div>
  </div>
</div>
<div>
<UserCard user={{firstName,lastName,photoUrl,age,gender,about}}/>
</div>
</div>

  )
}

export default EditProfile