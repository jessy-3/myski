import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

import {Header} from './components/Header/Header';
import ResortList from './components/ResortList/ResortList';
import {InfoPanel}  from './components/InfoPanel/InfoPanel';

import {
  setResortList, selectResortList,
} from './features/resorts/resortsSlice';
import {resorts} from './Resorts';


function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("App useEffect dispatch setResortList");
    dispatch(setResortList(resorts));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const resortList = useSelector(selectResortList); //(state) => state.resortList

  return(
    <>
      <Header />
      {resortList===[]? <div><h1>Loading...wait for the response</h1></div>:
        <ResortList resorts={resortList} />
      }
      <InfoPanel />
    </>
  );
}

export default App;