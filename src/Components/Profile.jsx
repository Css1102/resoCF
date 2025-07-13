import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import UserCard from './UserCard'
const Profile = () => {
  const user=useSelector((state)=>state?.user)
  return (
  user && (
    <div className='w-full min-h-screen'>
    <div>
    <EditProfile user={user}/>
    </div>
    </div>
    ))
}

export default Profile