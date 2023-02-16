import { configureStore } from '@reduxjs/toolkit'
import modeReducer from '../features/resorts/resortsSlice';


export default configureStore({
  reducer: 
    modeReducer
})