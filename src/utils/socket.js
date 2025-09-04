import {io} from 'socket.io-client'
import {BASE_URL} from './constant'
export const createSocketConnection=()=>{
console.log("JWT Token:", localStorage.getItem("token"))
const socket=io(import.meta.env.SOCKET_IO_URL,{
auth:{
token:localStorage.getItem("token")
},
 transports: ["polling","websocket"],
withCredentials:true
})
return socket
}