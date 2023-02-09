import React, { useState } from 'react';
import Webcam from "react-webcam";
import styles from './Webcam.module.css'


const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};

export const WebcamCapture = (props) => {

    const [image,setImage]=useState(props?.imgsrc ? props?.imgsrc : "");
    const webcamRef = React.useRef(null);
    const [oldimage, setOldImage]=useState(props?.imgsrc ? props?.imgsrc : "");
    
    const capture = React.useCallback(
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        setOldImage(imageSrc);
        props.setimgsrc(imageSrc);
        });

    console.log(props )
    console.log("props ", props?.imgsrc)
    console.log("old ", oldimage)
    console.log("image n:", image)
    return (
        <div className={styles.webcam_container}>
            <div className={styles.webcam_img}>
                {/* this.props */}
                {image === '' ? 
                    <Webcam
                        audio={false}
                        height={200}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={220}
                        videoConstraints={videoConstraints}/> : 
                    <img id='imgsrc' height={200} src={image} />
                }
            </div>
            <div>
                {image !== '' ?
                    <div>
                        <button onClick={(e) => {
                                e.preventDefault();
                                setImage('')
                            }}
                            className={styles.webcam_btn}>
                            Retake Image
                        </button>
                    </div> :
                    <div>
                        <button onClick={(e) => {
                                e.preventDefault();
                                capture();
                            }}
                            className={styles.webcam_btn}>
                            Capture
                        </button>
                        <button onClick={(e) => {
                                e.preventDefault();
                                setImage(oldimage);
                            }}
                            className={styles.webcam_btn}>
                            Cancel
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};
