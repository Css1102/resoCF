import {io} from 'socket.io-client'
export const createSocketConnection=()=>{
console.log("JWT Token:", localStorage.getItem("token"))
const socket=io(import.meta.env.SOCKET_IO_URL,{
auth:{
token:localStorage.getItem("token")
},
 transports: ["websocket","polling"],
withCredentials:true
})
return socket
}