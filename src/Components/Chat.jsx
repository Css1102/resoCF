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
  const groupMsgByDate=(messages)=>{
  const groupedMsg={}
  messages.forEach((msg)=>{
  const date=msg.createdAt?new Date(msg.createdAt.split('T')[0]):new Date()
  console.log(typeof(date))  
  const key=date.toDateString()
  if(!groupedMsg[key]){
  groupedMsg[key]=[]
  }
  groupedMsg[key].push(msg)
  })
  return groupedMsg
  }

  const formatDateLabel=(curr_date)=>{
  const now_date=new Date()
  const today_date=new Date(curr_date)
  const isToday=now_date.toDateString()===today_date.toDateString()
  const yesterday=new Date(now_date)
  yesterday.setDate(yesterday.getDate()-1)
  const isYesterday=yesterday.toDateString()===today_date.toDateString()
  if(isToday){
  return "Today"
  }
  if(isYesterday){
  return "Yesterday"
  }
  return today_date.toLocaleDateString("en-IN",{
  weekday:'short',
  month:'short',
day:'numeric'
  })
  }
  const fetchMessages = async () => {
    try {
      const res = await axios.get(BASE_URL+'/chat/'+toChatId, { withCredentials: true })
      const chatMessages = res?.data?.data?.messages.map((msg) => ({
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg?.text,
        createdAt:msg?.createdAt,
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
{Object.entries(groupMsgByDate(messages)).map(([dateKey, dayMessages]) => (
  <div key={dateKey} className="space-y-4">
    {/* Group Label */}
    <div className="text-center text-white text-sm font-semibold mb-4">
      {formatDateLabel(dateKey)}
    </div>

    {/* Messages for that day */}
    {dayMessages.map((msg, index) => {
      const isOwnMessage = user?.firstName === msg?.firstName;
      const senderStatus = statuses[msg.senderId] || {};

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
      );
    })}
  </div>
))}
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





