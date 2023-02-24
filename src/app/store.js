import { configureStore } from '@reduxjs/toolkit'
import resortReducer from '../features/resorts/resortsSlice';


export default configureStore({
  reducer:  resortReducer
})