import{configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice.js'
import feedSlice from './feedSlice.js'
import connectionSlice from './connectionSlice.js'
import requestSlice from './requestSlice.js'
const appStore=configureStore({
  reducer:{
  user:userSlice,
  feed:feedSlice,
  connection:connectionSlice,
  request:requestSlice,
  },
})

export default appStore;