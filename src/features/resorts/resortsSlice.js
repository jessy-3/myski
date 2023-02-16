import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: null,
    mode: 'Read',
    resort: "",
};

export const resortsSlice = createSlice({
  name: 'resorts',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
      setMode: (state,action) => {
        state.mode = action.payload
      },
      setResort: (state,action) => {
        state.resort = action.payload
      },
  }
});

export const { setMode, setResort } = resortsSlice.actions;

export const selectMode = (state) => state.mode;
export const selectResort = (state) => state.resort;

export default resortsSlice.reducer