import React, { useState, useEffect } from 'react';
import Webcam from "react-webcam";
import styles from './Webcam.module.css'

// const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 220,
    height: 165,
    facingMode: "user"
};

export const WebcamCapture = (props) => {

    const [image,setImage]=useState(props?.imgsrc);
    const webcamRef = React.useRef(null);
    
    useEffect(() => {
        if (props?.imgsrc) {
            setImage(props?.imgsrc);
        }
    }, [props?.imgsrc])

    const capture = React.useCallback(
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        props.setimgsrc(imageSrc);
        });

    return (
        <div className={styles.webcam_container}>
            <div className={styles.webcam_img}>
                {/* this.props */}
                {image === '' ? 
                    <Webcam
                        audio={false}
                        height={165}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={220}
                        videoConstraints={videoConstraints}/> : 
                    <img id='imgsrc' height={165} src={image} alt='' />
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
                        {props?.imgsrc ?
                            <button onClick={(e) => {
                                    e.preventDefault();
                                    setImage(props?.imgsrc);
                                }}
                                className={styles.webcam_btn}>
                                No Change
                            </button> : "" 
                        }                            
                    </div>
                }
            </div>
        </div>
    );
};
