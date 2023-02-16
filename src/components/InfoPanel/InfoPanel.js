import styles from './InfoPanel.module.css';
import React, { useState, useEffect } from 'react';
import { WebcamCapture} from '../Webcam/Webcam';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMode,
  setResort,
  selectMode,
  selectResort,
} from '../../features/resorts/resortsSlice';


export function InfoPanel(props) {
  const currentMode = useSelector(selectMode);
  const currentResort = useSelector(selectResort);
  const dispatch = useDispatch();

  // const { id, name, location, num_skiruns, imgsrc} = props?.resort;
    const [name, setName]=useState(currentResort ? currentResort.name : "");
    const [location, setLocation]=useState(currentResort ? currentResort.location : "");
    const [num_skiruns, setNum_SkiRuns]=useState(currentResort ? currentResort.num_skiruns : "1");
    const [imgsrc,setImgsrc]=useState(currentResort ? currentResort.imgsrc : "");
    const [errors,setErrors]=useState({});

    useEffect(() => {
        setName(currentResort ? currentResort.name : "");
        setLocation(currentResort ? currentResort.location : "");
        setNum_SkiRuns(currentResort ? currentResort.num_skiruns : "1");
        setImgsrc(currentResort ? currentResort.imgsrc : "");
        setErrors({});
    }, [currentResort, currentMode])

    function handleValidation() {
        let errors = {};
        let formIsValid = true;
    
        //Name
        if (!name||name==='') {
          formIsValid = false;
          errors["name"] = "Cannot be empty";
        }
        else if (typeof(name) !== "undefined") {
          if (!(name.match(/^[a-zA-Z ]+$/))) {
            formIsValid = false;
            errors["name"] = "Only letters";
          }
          else if (name.length < 3 || name.length > 20) {
            formIsValid = false;
            errors["name"] = "Length between 3 and 20";
          }
        }
        // Location
        if (!location||location==='') {
            formIsValid = false;
            errors["location"] = "Cannot be empty";
          }
          else if (typeof(location) !== "undefined") {
            if (!(location.match(/^[a-zA-Z1-9,. ]+$/))) {
              formIsValid = false;
              errors["location"] = "Only letters,numbers,comma,dot.";
            }
            else if (location.length < 2 || location.length > 30) {
              formIsValid = false;
              errors["location"] = "Length between 2 and 30";
            }
          }
        // Num_SkiRuns
        if (!num_skiruns||num_skiruns==='') {
            formIsValid = false;
            errors["num_skiruns"] = "Cannot be empty";
          }
          else if (typeof(num_skiruns) !== "undefined") {
            if (!(num_skiruns.toString().match(/^[0-9]+$/))) {
              formIsValid = false;
              errors["num_skiruns"] = "Only positive integer.";
            }
            else if (parseInt(num_skiruns)  < 0 || parseInt(num_skiruns) > 100) {
              formIsValid = false;
              errors["num_skiruns"] = "Should be 0 to 100.";
            }
          }
          
        setErrors(errors);
        return formIsValid;
      }
        
    function handleSubmit(event) { 

        event.preventDefault();

        if (!handleValidation()) {
          return;
        }

        if (currentMode === "Create") {
          dispatch(setResort({
                id: 0, 
                name: name, 
                location: location,
                num_skiruns: num_skiruns,
                imgsrc: imgsrc  
            }));
            dispatch(setMode('Created'));            
        }
        else if (currentMode === "Edit") {
          dispatch(setResort({
                id: currentResort?.id, 
                name: name, 
                location: location, 
                num_skiruns: num_skiruns,
                imgsrc: imgsrc
            }));
            dispatch(setMode('Edited'));
        }
        else {
           console.log("Unknown mode");
        return
        }
        event.preventDefault();
    }

    
return (
    <aside className={styles.panel} >
        { (currentMode === "Create" || currentMode === "Edit") ? 
        <div>
            <h3 className={styles.heading}>Resort info</h3>
            <div className={styles.panel_item_form}>
                <form onSubmit={(e)=> handleSubmit(e)} >
                    <label htmlFor="name">Name:</label><br/>
                    <input type="text" id="name" value={name} onChange={event => setName(event.target.value)} /><br/>
                    <span style={{ color: "red" }}>{errors["name"]}</span><br/>

                    <label htmlFor="location">Location:</label><br/>
                    <input type="text" id="location" value={location} onChange={event => setLocation(event.target.value)} /><br/>
                    <span style={{ color: "red" }}>{errors["location"]}</span><br/>
                    
                    <label htmlFor="num_skiruns">Number of Ski Runs:</label><br/>
                    <input type="number" value={num_skiruns} id="num_skiruns" onChange={event => setNum_SkiRuns(event.target.value)} /><br/>
                    <span style={{ color: "red" }}>{errors["num_skiruns"]}</span><br/>

                    <WebcamCapture imgsrc={imgsrc} setimgsrc={setImgsrc} />
                
                    <input className={styles.panel_item_form_input} type="submit" value={currentMode === "Create" ? "Create" : "Update"} />
                    <button className={styles.panel_item_form_input} onClick={() =>{
                        setName("");
                        setLocation("");
                        setNum_SkiRuns(1);
                        setImgsrc(""); 
                        setErrors({});
                        dispatch(setMode('Read'));
                        dispatch(setResort(""));
                        }}>
                        Cancel
                    </button> 
                 
                </form> 
            </div>
        </div> : 
        <div className={styles.panel_item_btn}>
            <button onClick={() =>{
              dispatch(setMode('Create'));
              dispatch(setResort(""));
              }}>
                Add New Resort
            </button> 
        </div> }
    </aside>
  );
};
