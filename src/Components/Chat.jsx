import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { createSocketConnection } from '../utils/socket'
import { BASE_URL } from '../utils/constant'
const Chat = () => {
  const { toChatId } = useParams()
  const user = useSelector((state) => state.user)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [statuses, setStatuses] = useState({});
  const userId = user?._id
  const scrollRef = useRef(null)
  const socketRef=useRef(null)
  const fetchMessages = async () => {
    try {
      const res = await axios.get(BASE_URL+'/chat/'+toChatId, { withCredentials: true })
      const chatMessages = res?.data?.data?.messages.map((msg) => ({
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg?.text,
        time: new Date(msg?.createdAt).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata'
  }),
        senderId:userId
      }))
      setMessages(chatMessages)
    } catch (err) {
      console.error(err?.response?.data)
    }
  }
  // ${BASE_URL}/status/${toChatId}`
const fetchStatus=async()=>{
try{
const res=await axios.get(BASE_URL+'/status/'+toChatId,{withCredentials:true})
console.log(res)
setStatuses(prev=>({...prev,[toChatId]:res?.data}))
}
catch(err){
console.log(err.response.data)
}
}

  useEffect(() => {
    fetchMessages()
  }, [])
 useEffect(()=>{
fetchStatus()
 },[toChatId, userId])
  useEffect(() => {
   socketRef.current = createSocketConnection()
    socketRef.current.emit("joinChat", { userId, toChatId })
     socketRef.current.on("messageReceived", ({ firstName, lastName, newMessage,senderId }) => {
      console.log(firstName + " :  " + newMessage);
           setMessages((messages) => [...messages, {
        senderId:senderId,
        firstName: firstName,
        lastName: lastName,
        text: newMessage,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' ,hour12:false,
          timeZone:'Asia/Kolkata'
        })
      }
]);
    });
  if (socketRef.current && toChatId && userId) {
    socketRef.current.emit("activeInChat", { userId});
        socketRef.current.on("userStatusChanged", ({ userId, isOnline, lastSeen }) => {
      setStatuses(prev => ({
        ...prev,
        [userId]: { online: isOnline, lastSeen }
      }));
    });
  }
 
    return () => {
      socketRef.current.off("messageReceived");
  socketRef.current.off("userStatusChanged");
    }
  }, [userId, toChatId])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    if(socketRef.current){
    socketRef.current.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      toChatId,
      newMessage
    })
    setNewMessage("")
  }
  }

  return (
    
    <div className="max-w-2xl w-full h-[90vh] mx-auto my-16 bg-slate-800 rounded-xl shadow-xl border border-gray-700 flex flex-col">
      <h1 className="p-5 border-b border-gray-700 text-white text-2xl font-bold">Chat</h1>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg, index) => {
          const isOwnMessage = user?.firstName === msg?.firstName
            const senderStatus = statuses[msg.senderId] || {};
            console.log(msg)
          return (
            <div key={index} className={`chat ${isOwnMessage ? 'chat-end' : 'chat-start'}`}>
    <div className="chat-image avatar flex items-center gap-[1px]">
  <div className="w-10 h-10 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold">
    {msg.firstName[0]}
  </div>
  <div
    className={`w-3 h-3 rounded-full ${
      senderStatus.online ? 'bg-green-500' : 'bg-yellow-400'
    }`}
    title={senderStatus.online ? 'Online' : 'Offline'}
  ></div>
</div>

{/* Last Seen Info */}
{!senderStatus.online && senderStatus.lastSeen && (
  <div className="mt-1 text-xs text-gray-400">
    Last seen:{" "}
    {new Date(senderStatus.lastSeen).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata',
      hour12: false
    })}
  </div>
)}
              <div className="chat-header text-white">
                {`${msg.firstName} ${msg.lastName}`}
                <time className="text-xs opacity-60 ml-2" title={msg.time}>{msg.time}</time>
              </div>
              <div className="chat-bubble max-w-[350px] text-left bg-blue-500 text-white px-2 py-2 rounded-lg shadow-md">
                {msg.text}
              </div>
              <div className="chat-footer text-xs opacity-50">Delivered</div>
            </div>
          )
        })}
      </div>

      <div className="p-5 border-t border-gray-700 flex items-center gap-3 bg-slate-900">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow bg-slate-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat





// import React from 'react'
// import { useParams } from 'react-router'
// import { createSocketConnection } from '../utils/socket'
// import {useEffect,useState} from 'react'
// import { useSelector } from 'react-redux'
// import { BASE_URL } from '../utils/constant'
// import axios from 'axios'
// const Chat = () => {
//     const {toChatId}=useParams()
//     const user=useSelector((state)=>state.user)
//     const[messages,setMessages]=useState([])
//     const[newMessage,setNewMessage]=useState("")
//     const userId=user?._id
//     const fetchMessages=async()=>{
//     try{
//     const incomingMsg=await axios.get(BASE_URL+'/chat/'+toChatId,{withCredentials:true})
//     console.log(incomingMsg?.data?.data?.messages)
//     const chatMessages=incomingMsg?.data?.data?.messages.map((msg)=>{
//     return {
//     firstName:msg?.senderId?.firstName,
//     lastName:msg?.senderId?.lastName,
//     newMessage:msg?.text,
//     time:msg?.createdAt.split('T')[1].slice(0,5)
//     }})
//     setMessages(chatMessages)
//     }
//     catch(err){
//     console.error(err?.response?.data)
//     }
//     }
//     useEffect(()=>{
//     fetchMessages()
//     },[])
//   useEffect(()=>{
//   const socket=createSocketConnection()
//   // as soon as the page loads make the connection join the chat
//   socket.emit("joinChat",{userId,toChatId})

//   return ()=>{
//   socket.disconnect()
//   }
//   },[userId,toChatId])

//   const sendMessage=()=>{
//   const socket=createSocketConnection()
//   socket.emit("sendMessage",{firstName:user?.firstName,lastName:user?.lastName,userId,toChatId,newMessage})
//   setMessages((messages)=>[...messages,{firstName:user?.firstName,lastName:user?.lastName,newMessage}])
//   setNewMessage("")
//   }
//   return (
//     <div className='w-[55%] h-[100vh] border border-gray-600 my-20 mx-auto flex flex-col'>
//     <h1 className="p-5 border-b border-gray-600 font-bold text-2xl text-white">Chat</h1>
//     <div className='flex-1 overflow-scroll p-5'>
//     {messages?.map((msg,index)=>{
//       return (
//         <React.Fragment key={index}>
//     <div className={`chat ${user?.firstName===msg?.firstName?'chat-end':'chat-start'}`}>
//   <div className="chat-image avatar">
//   </div>
//   <div className="chat-header text-white">
//   {`${msg.firstName}  ${msg.lastName}`}
//   {console.log(msg?.createdAt)}
//     <time className="text-xs opacity-50">{msg?.time}</time>
//   </div>
//   <div className="chat-bubble">{msg.newMessage}</div>
//   <div className="chat-footer opacity-50">Delivered</div>
// </div>
// <div className="chat chat-end">
//   <div className="chat-image avatar">
//   </div>
// </div>
// </React.Fragment>
//     );
//     })}
//     </div>
//     <div className="p-5 border-gray-600 border-t flex justify-between items-center gap-2">
//     <input value={newMessage}  className='w-[550px] border border-gray-500 bg-slate-900 text-white rounded-xl p-2' type="text"
//     onChange={(e)=>setNewMessage(e.target.value)}></input>
//     <button onClick={sendMessage} className='btn btn-secondary text-white w-[60px] h-[40px]'>Send</button>
//     </div>
//     </div>
//   )
// }

// export default Chat