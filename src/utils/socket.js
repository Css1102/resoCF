import {io} from 'socket.io-client'
import {BASE_URL} from './constant'
export const createSocketConnection=()=>{
console.log("JWT Token:", localStorage.getItem("token"))
const socket=io(BASE_URL,{
auth:{
token:localStorage.getItem("token")
},
withCredentials:true
})
return socket
}