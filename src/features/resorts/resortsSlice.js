import { createSlice, current } from '@reduxjs/toolkit'


const initialState = {
    id: null,
    mode: 'Read',
    resort: "",
    resortList: []
};


export const resortsSlice = createSlice({
  name: 'resorts',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
      setMode: (state,action) => {
        state.mode = action.payload
      },
      setResort: (state, action) => {
        state.resort = action.payload
      },
      setResortList: (state, action) => {
        console.log("setResortList",action.payload);
        state.resortList = action.payload
      },
      creatResort: (state, action) => {
        var newresort = {...action.payload};
        // Retrieve max resort id to assign a unique auto increased id number.
        if (state.resortList.length) {
          newresort.id = Math.max(...state.resortList.map(o => o.id)) + 1;
        }else newresort.id = 1;
        state.resortList.push(newresort);
        console.log(current(state).resortList);
      },
      deleteResort: (state, action) => {
        //don't mutate the state directly, instead
        //create a new array by spreading state
        const currentResorts = [...current(state).resortList];
        console.log("currentResorts",currentResorts)
        var index = currentResorts.indexOf(action.payload);
        console.log("index",index,action.payload)
        currentResorts.splice(index, 1);
        return {
          ...state,
          resortList: currentResorts
        }
      },
      editResort: (state, action) => {
        var index = state.resortList.indexOf(state.resortList.filter((x) => x['id']===action.payload.id)[0]);
        console.log("index", index, action.payload);
        state.resortList[index] = action.payload;
      }
  }
});

export const { 
  setMode, setResort, setResortList, 
  creatResort, deleteResort, editResort 
  } = resortsSlice.actions;

export const selectMode = (state) => state.mode;
export const selectResort = (state) => state.resort;
export const selectResortList = (state) => state.resortList;

export default resortsSlice.reducer