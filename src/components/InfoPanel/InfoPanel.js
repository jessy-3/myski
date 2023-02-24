import styles from './InfoPanel.module.css';
import React, { useState, useEffect } from 'react';
import { WebcamCapture} from '../Webcam/Webcam';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMode,
  selectMode,
  setResort,
  selectResort,
  creatResort,
  editResort
} from '../../features/resorts/resortsSlice';

export function InfoPanel() {
  const initInfo = {
    id: 0,
    name: "",
    location:"",
    num_skiruns: "1",
    imgsrc:""
  };

  const [info, setInfo]=useState({});
  const [image,setImage]=useState("");
  const [errors,setErrors]=useState({});
  
  const currentResort = useSelector(selectResort);
  const currentMode = useSelector(selectMode);
  const dispatch = useDispatch();

  console.log("InfoPanel info1", info);

    useEffect(() => {
      console.log("InfoPanel useEffect1",info);
      setInfo({
        ...info,
        imgsrc: image
      })
    // eslint-disable-next-line
    }, [image])

    useEffect(() => {
        setInfo(currentResort);
        console.log("InfoPanel useEffect3",currentResort );
        setErrors({});
    // eslint-disable-next-line
    }, [currentResort])

    function handleValidation() {
        let errors = {};
        let formIsValid = true;
    
        //Name
        if (!info.name||info.name==='') {
          formIsValid = false;
          errors["name"] = "Cannot be empty";
        }
        else if (typeof(info.name) !== "undefined") {
          if (!(info.name.match(/^[a-zA-Z ]+$/))) {
            formIsValid = false;
            errors["name"] = "Only letters";
          }
          else if (info.name.length < 3 || info.name.length > 20) {
            formIsValid = false;
            errors["name"] = "Length between 3 and 20";
          }
        }
        // Location
        if (!info.location||info.location==='') {
            formIsValid = false;
            errors["location"] = "Cannot be empty";
          }
          else if (typeof(info.location) !== "undefined") {
            if (!(info.location.match(/^[a-zA-Z1-9,. ]+$/))) {
              formIsValid = false;
              errors["location"] = "Only letters,numbers,comma,dot.";
            }
            else if (info.location.length < 2 || info.location.length > 30) {
              formIsValid = false;
              errors["location"] = "Length between 2 and 30";
            }
          }
        // Num_SkiRuns
        if (!info.num_skiruns||info.num_skiruns==='') {
            formIsValid = false;
            errors["num_skiruns"] = "Cannot be empty";
          }
          else if (typeof(info.num_skiruns) !== "undefined") {
            if (!(info.num_skiruns.toString().match(/^[0-9]+$/))) {
              formIsValid = false;
              errors["num_skiruns"] = "Only positive integer.";
            }
            else if (parseInt(info.num_skiruns)  < 0 || parseInt(info.num_skiruns) > 100) {
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
        switch(currentMode) {
          case 'Create':
            dispatch(creatResort(info));
            dispatch(setResort(""));
            break;
          case 'Edit':
            dispatch(editResort(info));
            dispatch(setResort(""));
            break;
          default:
            dispatch(setResort(""));
        }
    }

return (
    <aside className={styles.panel} >
        { currentResort && info? 
        <div>
            <h3 className={styles.heading}>Resort info</h3>
            <div className={styles.panel_item_form}>
                <form onSubmit={(e)=> handleSubmit(e)} >
                    <label htmlFor="name">Name:</label><br/>
                    <input type="text" id="name" value={info.name} onChange={event => setInfo({
                      ...info,
                      name:event.target.value})} /><br/>
                    <span style={{ color: "red" }}>{errors["name"]}</span><br/>

                    <label htmlFor="location">Location:</label><br/>
                    <input type="text" id="location" value={info.location} onChange={event => setInfo({
                      ...info,
                      location: event.target.value})} /><br/>
                    <span style={{ color: "red" }}>{errors["location"]}</span><br/>
                    
                    <label htmlFor="num_skiruns">Number of Ski Runs:</label><br/>
                    <input type="number" value={info.num_skiruns} id="num_skiruns" onChange={event => setInfo({
                      ...info,
                      num_skiruns: event.target.value})} /><br/>
                    <span style={{ color: "red" }}>{errors["num_skiruns"]}</span><br/>

                    <WebcamCapture imgsrc={info.imgsrc} setimgsrc={setImage} />
                
                    <input className={styles.panel_item_form_input} type="submit" value={"Save"} />
                    <button className={styles.panel_item_form_input} onClick={() =>{
                        setInfo(initInfo);
                        setErrors({});
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
              setInfo(initInfo);
              dispatch(setResort(initInfo));
              }}>
                Add New Resort
            </button> 
        </div> }
    </aside>
  );
};
