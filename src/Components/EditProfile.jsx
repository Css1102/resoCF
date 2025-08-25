import React from 'react'
import { useState,useEffect,useRef } from 'react'
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
const toastref=useRef(null)
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
  window.scrollTo({top:0,behavior:'smooth'})
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
  <div className="flex justify-evenly items-start min-h-screen bg-slate-800 px-4 py-12 mt-10">
    {/* Left: Edit Profile Form */}
    {isSaved && error.length === 0 && (
      <div
        ref={toastref}
        className="absolute top-6 left-[50%] transform -translate-x-1/2 z-50"
      >
        <div className="bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold text-center shadow-lg">
          Profile saved successfully.
        </div>
      </div>
    )}


    <div className="bg-gray-800 border border-gray-700 w-full max-w-md rounded-xl shadow-xl text-white p-6">

      <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

      {/* Input Fields */}
      <label className="block mb-4">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="w-full bg-gray-700 text-white p-3 rounded-md outline-none"
        />
      </label>

      <label className="block mb-4">
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="w-full bg-gray-700 text-white p-3 rounded-md outline-none"
        />
      </label>

      <label className="block mb-4">
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          className="w-full bg-gray-700 text-white p-3 rounded-md outline-none"
        />
      </label>

      <label className="block mb-4">
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          placeholder="Gender"
          className="w-full bg-gray-700 text-white p-3 rounded-md outline-none"
        />
      </label>

      <label className="block mb-4">
        <input
          type="text"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder="Photo URL"
          className="w-full bg-gray-700 text-white p-3 rounded-md outline-none"
        />
      </label>

      <label className="block mb-4">
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Skills"
          className="w-full bg-gray-700 text-white p-3 rounded-md outline-none"
        />
      </label>

      <label className="block mb-4">
        <input
          type="text"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="About"
          className="w-full bg-gray-700 text-white p-3 rounded-md outline-none"
        />
      </label>

      {/* Save Button + Error */}
      <div className="mt-4">
        {error && <p className="text-sm text-red-500 mb-2 text-center">{error}</p>}
        <button
          className="w-full bg-purple-600 hover:bg-purple-700 transition-all py-2 rounded-md font-semibold"
          onClick={saveProfile}
        >
          Save Profile
        </button>
      </div>
    </div>
    <div className="w-[20%]">
      <UserCard
        user={{ firstName, lastName, photoUrl, age, gender, about }}
        showActions={false}
      />
    </div>
  </div>
)

}

export default EditProfile