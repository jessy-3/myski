import {Header} from './components/Header/Header';
import ResortList from './components/ResortList/ResortList';
import {InfoPanel}  from './components/InfoPanel/InfoPanel';
import {resorts} from './Resorts';
import React, { useState, useEffect } from 'react';

function App() {
  const [action, setAction]=useState("Read");
  const [resort, setResort]=useState();

  useEffect(()=> {
    var index;
    var newresort;
    switch(action) {
      case 'Create':
        if (resort?.id) {
          newresort = {
            id: 0, 
            name: '', 
            location: '', 
            num_skiruns: 1,
            imgsrc: ''
          };
          setResort(newresort);
        } 
        break;
      case 'Created':
        newresort = resort;
        // Retrieve max resort id to assign a unique auto increased id number.
        newresort.id = resorts.reduce((a,b,)=> (parseInt(a.id) > parseInt(b.id) ? parseInt(a.id) : parseInt(b.id))) + 1;
        resorts.push(newresort);
        setAction("Read");
        break;
      case 'Edit':
        // index = resorts.indexOf(resorts.filter((x) => x===resort)[0]);
        break;
      case 'Edited':
        index = resorts.indexOf(resorts.filter((x) => x['id']===resort.id)[0]);
        resorts[index]['name'] = resort.name;
        resorts[index]['location'] = resort.location;
        resorts[index]['num_skiruns'] = parseInt(resort.num_skiruns);
        if (resort.imgsrc)
          resorts[index]['imgsrc'] = resort.imgsrc;
        setAction("Read");
        break;
      case 'Delete':
        index = resorts.indexOf(resorts.filter((x) => x===resort)[0]);
        delete resorts[index];
        setAction("Read");
        break;
      default:
        console.log("Read Mode")
    }
  }, [action, resort])

  return(
    <>
      <Header />
      <ResortList resorts={resorts} setresort={ setResort } setaction={ setAction } />
      <InfoPanel resort={resort} setresort={ setResort } setaction={ setAction } action={action} />
    </>
  );
}

export default App;