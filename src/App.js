import {Header} from './components/Header/Header';
import ResortList from './components/ResortList/ResortList';
import {InfoPanel}  from './components/InfoPanel/InfoPanel';
import {resorts} from './Resorts';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMode,
  setResort,
  selectMode,
  selectResort,
} from './features/resorts/resortsSlice';

function App() {
  const currentMode = useSelector(selectMode);
  const currentResort = useSelector(selectResort);
  const dispatch = useDispatch();

  useEffect(()=> {
    var index;
    switch(currentMode) {
      case 'Create':
          dispatch(setResort(""));
        break;
      case 'Created':
        var newresort;
        newresort = { ...currentResort};
        // Retrieve max resort id to assign a unique auto increased id number.
        if (resorts.length) {
          newresort.id = Math.max(...resorts.map(o => o.id)) + 1;
        }
        else newresort.id = 1;
        resorts.push(newresort);
        dispatch(setMode('Read'));
        dispatch(setResort(""));
        break;
      case 'Edit':
        // index = resorts.indexOf(resorts.filter((x) => x===resort)[0]);
        break;
      case 'Edited':
        index = resorts.indexOf(resorts.filter((x) => x['id']===currentResort.id)[0]);
        resorts[index] = currentResort;
        dispatch(setMode('Read'));
        dispatch(setResort(""));
        break;
      case 'Delete':
        index = resorts.indexOf(resorts.filter((x) => x===currentResort)[0]);
        resorts.splice(index,1);
        dispatch(setResort(""));
        dispatch(setMode('Read'));
        break;
      default:
        // console.log("useEffect: Read Mode")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMode]);

  return(
    <>
      <Header />
      <ResortList resorts={resorts} />
      <InfoPanel />
    </>
  );
}

export default App;