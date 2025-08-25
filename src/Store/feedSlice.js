import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
name:"feed",
initialState:null,
reducers:{
addToFeed:(state,action)=>{
console.log(action.payload)
return action.payload
},
removeFromFeed:(state,action)=>
{
let new_state=state.filter((i)=>i._id!==action.payload)
return new_state
}
}
})

export const{addToFeed,removeFromFeed}=feedSlice.actions
export default feedSlice.reducer