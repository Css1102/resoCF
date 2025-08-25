import { createSlice } from "@reduxjs/toolkit";

const requestSlice=createSlice({
name:"request",
initialState:null,
reducers:{
addRequest:(state,action)=>action.payload,
removeRequest:(state,action)=>{
console.log(typeof(action.payload))
let new_state=state.filter((r)=>r._id!==action.payload)
return new_state
}
}
})

export const{addRequest,removeRequest}=requestSlice.actions
export default requestSlice.reducer