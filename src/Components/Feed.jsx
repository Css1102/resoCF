import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { removeFromFeed, addToFeed } from '../Store/feedSlice'
import { BASE_URL } from '../utils/constant'
import UserCard from './UserCard'

const Feed = () => {
  const dispatch = useDispatch()
  const feedExist = useSelector((state) => state?.feed)
  const [loading, setLoading] = useState(true)

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/feed', { withCredentials: true })
      console.log(res.data)
      dispatch(addToFeed(res.data))
    } catch (err) {
      console.error(err.response?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  if (loading) {
    return (
      <h1 className='flex justify-center py-10 text-white'>Loading your feed...</h1>
    )
  }

  if (!feedExist || feedExist.length === 0) {
    return (
      <h1 className='flex justify-center relative top-40 text-white'>You have reached the end of your feed 🫠🫠</h1>
    )
  }

  return (
    <div className='bg-slate-800 w-full min-h-screen flex justify-center items-start gap-2 py-12 '>
      <UserCard user={feedExist[0]} />
    </div>
  )
}

export default Feed
