import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Profile from './Components/Profile'
import {Provider} from 'react-redux'
import appStore from './Store/appStore'
import Feed from './Components/Feed'
import Connections from './Components/Connections'
import ViewProfile from './Components/ViewProfile'
import Forgotpassword from './Components/Forgotpassword'
import Chat from './Components/Chat'
import { lazy,Suspense } from 'react'

const Requests=lazy(()=>import('./Components/Requests'))
function App() {
const Router=createBrowserRouter(
createRoutesFromElements(
  <Route path='/' element={<Home/>}>
  <Route path='/feed' element={<Feed/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/profile' element={<Profile/>}/>
  <Route path='/connection' element={<Connections/>}/>
  <Route path='viewprofile' element={<ViewProfile/>}/>
  <Route path='/request' element={
  <Suspense fallback={<div className="text-white text-xl p-10">Loading Requests...</div>}>
<Requests/>
</Suspense>
}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/chat/:toChatId' element={<Chat/>}/>
  <Route path='/forgotpassword' element={<Forgotpassword/>}/>
  </Route>
)
)
  return (
    <Provider store={appStore}>
   <RouterProvider router={Router}/>
   </Provider>
  )
}

export default App
